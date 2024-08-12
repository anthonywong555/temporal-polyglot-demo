import { Connection, Client } from '@temporalio/client';
import { protobufExample } from './workflows';
import { nanoid } from 'nanoid';
import { foo, ComposeGreetingInput } from '../protos/root'; 

async function run() {
  const connection = await Connection.connect({ address: 'localhost:7233' });

  const client = new Client({
    connection,
    dataConverter: { payloadConverterPath: require.resolve('./payload-converter') }
  });

  const handle = await client.workflow.start(protobufExample, {
    taskQueue: `polyglot-nodejs`,
    args: [ComposeGreetingInput.create({ name: 'Temporal' })],
    workflowId: `polyglot-workflow-protobufs-${nanoid()}`
  });

  console.log(`Started workflow ${handle.workflowId}`);

  const result: foo.bar.ComposeGreetingResponse = await handle.result();
  console.log(result.message);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
