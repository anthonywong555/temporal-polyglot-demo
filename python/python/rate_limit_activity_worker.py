import asyncio
import python.ai_messages_pb2 as ai_messages_pb2

from random import randint
from temporalio import activity
from temporalio.client import Client
from temporalio.worker import Worker

task_queue = "polyglot-python-rate-limit"

@activity.defn(name="numberCrushingRateLimit")
async def crunch_some_numbers(input: int) -> int:
    return input

async def main():
    print('Connecting to Temporal')
    client = await Client.connect("localhost:7233")
    max_task_queue_activities_per_second = 1

    worker = Worker(client, task_queue=task_queue, activities=[crunch_some_numbers], max_task_queue_activities_per_second=max_task_queue_activities_per_second)
    
    print('Spinning up 🐍 Python Activity Worker with Max Activity Per Second: ', max_task_queue_activities_per_second)
    await worker.run()

if __name__ == "__main__":
    asyncio.run(main())