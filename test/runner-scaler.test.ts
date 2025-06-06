import { App, Stack, Duration } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { AutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import { AmazonLinuxImage, InstanceType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Schedule } from 'aws-cdk-lib/aws-events';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { RunnerScaler } from '../src/scaler';

test('creates scaling policy', () => {
  const app = new App();
  const stack = new Stack(app, 'stack');
  const vpc = new Vpc(stack, 'VPC');
  const asg = new AutoScalingGroup(stack, 'ASG', {
    instanceType: new InstanceType('t3.micro'),
    machineImage: new AmazonLinuxImage(),
    vpc,
  });
  const secret = new Secret(stack, 'Secret');

  new RunnerScaler(stack, 'Scaler', {
    autoScalingGroup: asg,
    gitlabUrl: 'https://gitlab.com',
    tokenSecret: secret,
    schedule: Schedule.rate(Duration.minutes(5)),
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::AutoScaling::ScalingPolicy', {
    PolicyType: 'StepScaling',
  });
});
