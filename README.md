# temporal-polyglot-demo

This repo demostrates how you can use Temporal with other langauges.

## Prerequisite

- [Temporal CLI](https://github.com/temporalio/cli) or [Temporal Cloud](https://pages.temporal.io/cloud-early-access)

### Python

- [Poetry](https://python-poetry.org/docs/#installation)

### NodeJS

- [Node Version Manager](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

### gRPC (Optional)

If you want to try out using gRPC you will need to install the following.

- [protoc](https://grpc.io/docs/protoc-installation/)
- [protobufjs-cli](https://github.com/protobufjs/protobuf.js/tree/master?tab=readme-ov-file#installation)

## Setup

Here is how to setup workers.

### Python

Navigate to the *python* directory in your terminal. 

Execute the following commands:

```sh
poetry install
```

### NodeJS

In another terminal, navigate to the *typescript* directory. 

Execute the following commands:

```sh
npm install
```

## Running the demo

### Python

Navigate to the *python* directory in your terminal.

Run the following commands kick off the Python Activity Worker:

```sh
poetry run python/activity_worker.py
```

### NodeJS

Run the following commands to kick off the NodeJS Workflow Worker:

```sh
npm run start.watch
```

Run the following command to kick off the client.

```sh
npm run workflows
```

## Running the gRPC demo

To run the gRPC demo, you will first need to do the following.

### Python

To convert the *ai-messages.proto* file into *ai_messages_pb2.py*, execute the following command:

```sh
protoc -I=. --python_out=. ai-messages.proto
```

### NodeJS

To convert the *ai-messages.proto* file into a *json-module.js*, execute the following command:

```sh
npm run build
```

```sh
npm run workflow-grpc
```