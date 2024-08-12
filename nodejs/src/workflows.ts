import { proxyActivities } from '@temporalio/workflow';
import { ai } from '../protos/root';

interface AIActivities {
  numberCrushing(input: number): Promise<number>,
}

const { numberCrushing } = proxyActivities<AIActivities>({
  taskQueue: 'polyglot-python',
  scheduleToCloseTimeout: '1m'
});

interface AIActivitiesWithProtoBufs {
  numberCrushingProto(input: ai.NumberCrushingInput): Promise<ai.NumberCrushingOutput>
}

const { numberCrushingProto } = proxyActivities<AIActivitiesWithProtoBufs>({
  taskQueue: 'polyglot-python-protobufs',
  scheduleToCloseTimeout: '1m'
})

interface RateLimitActivites {
  numberCrushingRateLimit(input: number): Promise<number>
}

const { numberCrushingRateLimit } = proxyActivities<RateLimitActivites>({
  taskQueue: 'polyglot-python-rate-limit',
  scheduleToCloseTimeout: '1m'
})

export async function rateLimitExample(input: number): Promise<number> {
  return await numberCrushingRateLimit(input);
}

export async function simpleExample(input: number): Promise<number> {
  const result = await numberCrushing(input);
  return result;
}

export async function protobufExample(input: ai.NumberCrushingInput): Promise<ai.NumberCrushingOutput> {
  const result = await numberCrushingProto(input);
  return result;
}

export async function simpleExampleSlow(input: number): Promise<number> {
  const result = await numberCrushing(input);
  return result;
}