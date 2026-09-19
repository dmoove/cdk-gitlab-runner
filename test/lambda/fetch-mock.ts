/**
 * Small `fetch` mock for the Lambda handler tests.
 *
 * Routes are matched by HTTP method and URL path. A route can be a fixed
 * response or a function that receives the parsed URL.
 */
export interface RecordedCall {
  readonly method: string;
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: unknown;
}

type Responder = Response | ((url: URL) => Response);

export function jsonResponse(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {},
): Response {
  return new Response(body === null ? null : JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

export function mockFetch() {
  const routes = new Map<string, Responder>();
  const calls: RecordedCall[] = [];
  const original = global.fetch;

  const spy = jest
    .spyOn(global, 'fetch')
    .mockImplementation(
      (input: Parameters<typeof fetch>[0], init?: RequestInit) => {
        const url = new URL(
          typeof input === 'string'
            ? input
            : input instanceof URL
              ? input.toString()
              : input.url,
        );
        const method = init?.method ?? 'GET';
        calls.push({
          method,
          url,
          headers: (init?.headers as Record<string, string>) ?? {},
          body:
            typeof init?.body === 'string' ? JSON.parse(init.body) : undefined,
        });
        const responder = routes.get(`${method} ${url.pathname}`);
        if (!responder) {
          return Promise.resolve(
            new Response(`no mock for ${method} ${url.pathname}`, {
              status: 599,
            }),
          );
        }
        const response =
          typeof responder === 'function' ? responder(url) : responder.clone();
        return Promise.resolve(response);
      },
    );

  return {
    calls,
    on(method: string, path: string, responder: Responder) {
      routes.set(`${method} ${path}`, responder);
    },
    restore() {
      spy.mockRestore();
      global.fetch = original;
    },
  };
}
