import asyncio

from random import randint
from temporalio import activity
from temporalio.client import Client
from temporalio.worker import Worker

task_queue = "say-hello-task-queue"

@activity.defn(name='sayHelloActivity')
async def say_hello_activity(name: str) -> str:
    return f"Hello, {name}!"

@activity.defn(name="crunchSomeNumbers")
async def crunch_some_numbers() -> str:
    randomNumber = randint(1, 5)
    #await asyncio.sleep(randomNumber)
    return randomNumber

async def main():
    print('Connecting to Temporal ')
    # Create client to localhost on default namespace
    client = await Client.connect("localhost:7233")

    # Run activity worker
    #worker = Worker(client, task_queue=task_queue, activities=[say_hello_activity, crunch_some_numbers], max_task_queue_activities_per_second=1)
    worker = Worker(client, task_queue=task_queue, activities=[say_hello_activity, crunch_some_numbers])
    
    print('Spinning up AI Worker')
    await worker.run()

if __name__ == "__main__":
    asyncio.run(main())