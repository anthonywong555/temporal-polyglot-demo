import { Connection, Client } from '@temporalio/client';
import { simpleExample, protobufExample } from './workflows';
import { nanoid } from 'nanoid';
import { ai } from '../protos/root'; 

async function run() {
  const client = new Client({
    dataConverter: { payloadConverterPath: require.resolve('./payload-converter') }
  });

  const handle = await client.workflow.start(protobufExample, {
    args: [ai.NumberCrushingInput.create({ input: 1 })],
    taskQueue: `hello-world`,
    workflowId: `protobuf-workflow-${nanoid()}`
  });

  const result: ai.NumberCrushingOutput = await handle.result();
  console.log(result.toJSON());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
