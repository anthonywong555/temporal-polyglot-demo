import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

interface AIActivities {
  sayHelloActivity(name: string): Promise<string>
}

const { sayHelloActivity } = proxyActivities<AIActivities>({
  taskQueue: 'say-hello-task-queue',
  scheduleToCloseTimeout: '1m'
})

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
  const message = await sayHelloActivity(name);
  return message;
}
