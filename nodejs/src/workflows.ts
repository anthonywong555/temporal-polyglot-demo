import { proxyActivities } from '@temporalio/workflow';
import { foo, ComposeGreetingInput } from '../protos/root';

interface AIActivities {
  compose_greeting(name: string): Promise<string>,
  compose_greeting_protobufs(input: ComposeGreetingInput): Promise<foo.bar.ComposeGreetingResponse>
}

const { compose_greeting, compose_greeting_protobufs } = proxyActivities<AIActivities>({
  taskQueue: 'polyglot-python',
  scheduleToCloseTimeout: '1m'
});

export async function example(name: string): Promise<string> {
  const result = await compose_greeting(name);
  return result;
}

export async function protobufExample(input: ComposeGreetingInput): Promise<foo.bar.ComposeGreetingResponse> {
  const result = await compose_greeting_protobufs(input);
  return result;
}