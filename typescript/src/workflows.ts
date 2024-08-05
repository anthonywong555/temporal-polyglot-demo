import { proxyActivities } from '@temporalio/workflow';
//import { ai } from '../../protos/root';

interface AIActivities {
//  numberCrushingProto(input: ai.NumberCrushingInput): Promise<ai.NumberCrushingOutput>
  numberCrushing(input: number): Promise<number>
}

const { numberCrushing,  } = proxyActivities<AIActivities>({
  taskQueue: 'ai-queue',
  scheduleToCloseTimeout: '1m'
});

/** A workflow that simply calls an activity */
/*
export async function example(name: string): Promise<string> {
  //const message = await sayHelloActivity(name);
  const input = ai.NumberCrushingInput.create({input: 1});
  const randomNumber = await numberCrushingProto(input);
  console.log(randomNumber);
  return randomNumber.output;
}
*/

export async function simpleExample(input: number): Promise<number> {
  const result = await numberCrushing(input);
  return result;
}