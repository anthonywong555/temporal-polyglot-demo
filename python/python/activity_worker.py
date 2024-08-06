import asyncio
import python.python.ai_messages_pb2 as ai_messages_pb2

from random import randint
from temporalio import activity
from temporalio.client import Client
from temporalio.worker import Worker

task_queue = "ai-queue"

@activity.defn(name="numberCrushing")
async def crunch_some_numbers(input: int) -> int:
    return input

@activity.defn(name="numberCrushingProto")
async def crunch_some_numbers_proto(input: ai_messages_pb2.NumberCrushingInput) -> ai_messages_pb2.NumberCrushingOutput:
    result = ai_messages_pb2.NumberCrushingOutput()
    result.output = input.input
    return result

async def main():
    print('Connecting to Temporal ')
    # Create client to localhost on default namespace
    client = await Client.connect("localhost:7233")

    # Run activity worker
    #worker = Worker(client, task_queue=task_queue, activities=[crunch_some_numbers, crunch_some_numbers_proto], max_task_queue_activities_per_second=1)
    worker = Worker(client, task_queue=task_queue, activities=[ crunch_some_numbers, crunch_some_numbers_proto])
    
    print('Spinning up AI Worker')
    await worker.run()

if __name__ == "__main__":
    asyncio.run(main())