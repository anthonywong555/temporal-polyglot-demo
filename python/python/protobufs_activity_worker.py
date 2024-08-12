import asyncio
import python.messages_pb2 as messages_pb2
import python.namespaced_messages_pb2 as namespaced_messages_pb2

from temporalio import activity
from temporalio.client import Client
from temporalio.worker import Worker

task_queue = "polyglot-python"

@activity.defn
async def compose_greeting_protobufs(input: messages_pb2.ComposeGreetingInput) -> namespaced_messages_pb2.ComposeGreetingResponse:
    response = namespaced_messages_pb2.ComposeGreetingResponse()
    response.message = f"Hello, {input.name}!"
    return response

async def main():
    print('Connecting to Temporal')
    client = await Client.connect("localhost:7233")

    worker = Worker(client, task_queue=task_queue, activities=[compose_greeting_protobufs])
    
    print('Spinning up Protobufs Python Activity Worker')
    await worker.run()

if __name__ == "__main__":
    asyncio.run(main())