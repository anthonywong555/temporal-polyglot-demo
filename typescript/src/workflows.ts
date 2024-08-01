import { proxyActivities } from '@temporalio/workflow';

interface AIActivities {
  sayHelloActivity(name: string): Promise<string>
  crunchSomeNumbers(): Promise<string>
}

const { sayHelloActivity, crunchSomeNumbers } = proxyActivities<AIActivities>({
  taskQueue: 'ai-queue',
  scheduleToCloseTimeout: '1m'
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
  //const message = await sayHelloActivity(name);
  const randomNumber = await crunchSomeNumbers();
  return randomNumber;
}
