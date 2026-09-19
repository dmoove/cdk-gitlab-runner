/**
 * Minimal GitLab REST client for the Lambda functions of this library.
 *
 * It only covers the handful of endpoints the runner lifecycle needs and is
 * built on the global `fetch` of Node.js 22, so the bundles carry no GitLab
 * client dependency.
 */

/** Subset of a GitLab job as returned by the jobs endpoints. */
export interface GitLabJob {
  readonly id: number;
  readonly status: string;
  readonly tag_list?: string[];
}

/** Subset of a GitLab project as returned by the group projects endpoint. */
export interface GitLabProject {
  readonly id: number;
  readonly path_with_namespace?: string;
}

/** Job status values accepted by `GET /runners/:id/jobs`. */
export type RunnerJobStatus = 'running' | 'success' | 'failed' | 'canceled';

/** Job scope values accepted by `GET /projects/:id/jobs`. */
export type ProjectJobScope =
  | 'created'
  | 'pending'
  | 'running'
  | 'failed'
  | 'success'
  | 'canceled'
  | 'skipped'
  | 'waiting_for_resource'
  | 'manual';

/** Error raised for non-successful GitLab responses. */
export class GitLabApiError extends Error {
  constructor(
    readonly status: number,
    readonly method: string,
    readonly path: string,
    body: string,
  ) {
    super(`GitLab ${method} ${path} failed with ${status}: ${body}`);
    this.name = 'GitLabApiError';
  }
}

export interface GitLabClientOptions {
  /** Base URL of the GitLab instance, for example `https://gitlab.com/`. */
  readonly endpoint: string;
  /** Access token sent as `PRIVATE-TOKEN`. */
  readonly token: string;
  /** Page size used for paginated requests. @default 100 */
  readonly perPage?: number;
}

export class GitLabClient {
  private readonly baseUrl: string;
  private readonly token: string;
  private readonly perPage: number;

  constructor(options: GitLabClientOptions) {
    this.baseUrl = `${options.endpoint.replace(/\/+$/, '')}/api/v4`;
    this.token = options.token;
    this.perPage = options.perPage ?? 100;
  }

  /**
   * Pauses or resumes a runner.
   *
   * @returns `false` when the runner does not exist (already deleted).
   */
  async setRunnerPaused(runnerId: number, paused: boolean): Promise<boolean> {
    const response = await this.request('PUT', `/runners/${runnerId}`, {
      paused,
    });
    return response !== undefined;
  }

  /** Lists the jobs of a runner filtered by status, across all pages. */
  async listRunnerJobs(
    runnerId: number,
    status: RunnerJobStatus,
  ): Promise<GitLabJob[]> {
    return this.paginate<GitLabJob>(`/runners/${runnerId}/jobs`, { status });
  }

  /**
   * Deletes a runner.
   *
   * @returns `false` when the runner was already gone.
   */
  async deleteRunner(runnerId: number): Promise<boolean> {
    const response = await this.request('DELETE', `/runners/${runnerId}`);
    return response !== undefined;
  }

  /** Lists all projects of a group including subgroups. */
  async listGroupProjects(groupId: number): Promise<GitLabProject[]> {
    return this.paginate<GitLabProject>(`/groups/${groupId}/projects`, {
      include_subgroups: 'true',
      simple: 'true',
    });
  }

  /** Lists the jobs of a project in the given scope, across all pages. */
  async listProjectJobs(
    projectId: number,
    scope: ProjectJobScope,
  ): Promise<GitLabJob[]> {
    return this.paginate<GitLabJob>(`/projects/${projectId}/jobs`, {
      scope,
    });
  }

  private async paginate<T>(
    path: string,
    query: Record<string, string>,
  ): Promise<T[]> {
    const items: T[] = [];
    let page: string | undefined = '1';

    while (page) {
      const url = this.url(path, {
        ...query,
        per_page: String(this.perPage),
        page,
      });
      const response = await this.fetch('GET', url);
      if (!response.ok) {
        throw new GitLabApiError(
          response.status,
          'GET',
          path,
          await response.text(),
        );
      }
      items.push(...((await response.json()) as T[]));
      const next = response.headers.get('x-next-page');
      page = next && next.length > 0 ? next : undefined;
    }

    return items;
  }

  /**
   * Sends a non-paginated request.
   *
   * @returns the parsed body, or `undefined` for a 404
   */
  private async request(
    method: 'PUT' | 'DELETE' | 'POST',
    path: string,
    body?: unknown,
  ): Promise<unknown> {
    const response = await this.fetch(method, this.url(path, {}), body);
    if (response.status === 404) {
      return undefined;
    }
    if (!response.ok) {
      throw new GitLabApiError(
        response.status,
        method,
        path,
        await response.text(),
      );
    }
    if (response.status === 204) {
      return null;
    }
    return response.json();
  }

  private url(path: string, query: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    Object.entries(query).forEach(([key, value]) =>
      url.searchParams.set(key, value),
    );
    return url.toString();
  }

  private async fetch(
    method: string,
    url: string,
    body?: unknown,
  ): Promise<Response> {
    return fetch(url, {
      method,
      headers: {
        'PRIVATE-TOKEN': this.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  }
}
