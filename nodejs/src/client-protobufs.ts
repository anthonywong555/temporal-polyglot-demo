import { Connection, Client } from '@temporalio/client';
import { protobufExample } from './workflows';
import { nanoid } from 'nanoid';
import { ai } from '../protos/root'; 

async function run() {
  const connection = await Connection.connect({ address: 'localhost:7233' });

  const client = new Client({
    connection,
    dataConverter: { payloadConverterPath: require.resolve('./payload-converter') }
  });

  const handle = await client.workflow.start(protobufExample, {
    taskQueue: `polyglot-nodejs`,
    args: [ai.NumberCrushingInput.create({ input: 1 })],
    workflowId: `polyglot-workflow-protobufs-${nanoid()}`
  });

  console.log(`Started workflow ${handle.workflowId}`);

  const result: ai.NumberCrushingOutput = await handle.result();
  console.log(result.toJSON());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
