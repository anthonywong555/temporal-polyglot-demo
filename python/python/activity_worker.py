import asyncio
import random
import string

from temporalio import activity
from temporalio.client import Client
from temporalio.worker import Worker

task_queue = "say-hello-task-queue"

@activity.defn(name='sayHelloActivity')
async def say_hello_activity(name: str) -> str:
    return f"Hello, {name}!"


async def main():
    print('Connecting to Temporal')
    # Create client to localhost on default namespace
    client = await Client.connect("localhost:7233")

    # Run activity worker
    async with Worker(client, task_queue=task_queue, activities=[say_hello_activity]):
        print('Spinning Python Worker')
        await asyncio.sleep(10000)


if __name__ == "__main__":
    asyncio.run(main())