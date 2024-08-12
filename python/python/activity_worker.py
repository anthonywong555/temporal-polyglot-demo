import asyncio

from temporalio import activity
from temporalio.client import Client
from temporalio.worker import Worker

task_queue = "polyglot-python"

@activity.defn
async def compose_greeting(name: str) -> str:
    return f"Hello, {name}!"

async def main():
    print('Connecting to Temporal')
    client = await Client.connect("localhost:7233")

    worker = Worker(client, task_queue=task_queue, activities=[compose_greeting])
    
    print('Spinning up Python Activity Worker')
    await worker.run()

if __name__ == "__main__":
    asyncio.run(main())