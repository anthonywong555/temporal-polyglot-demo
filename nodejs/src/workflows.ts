import { proxyActivities } from '@temporalio/workflow';
import { ai } from '../protos/root';

interface AIActivities {
  numberCrushing(input: number): Promise<number>,
  numberCrushingProto(input: ai.NumberCrushingInput): Promise<ai.NumberCrushingOutput>
}

const { numberCrushing, numberCrushingProto } = proxyActivities<AIActivities>({
  taskQueue: 'polyglot-python',
  scheduleToCloseTimeout: '1m'
});

export async function simpleExample(input: number): Promise<number> {
  const result = await numberCrushing(input);
  return result;
}

export async function protobufExample(input: ai.NumberCrushingInput): Promise<ai.NumberCrushingOutput> {
  const result = await numberCrushingProto(input);
  return result;
}