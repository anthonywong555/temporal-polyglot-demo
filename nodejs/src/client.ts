import { Connection, Client } from '@temporalio/client';
import { simpleExample } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  const connection = await Connection.connect({ address: 'localhost:7233' });

  const client = new Client({
    connection
  });

  const handle = await client.workflow.start(simpleExample, {
    taskQueue: 'polyglot-nodejs',
    args: [1],
    workflowId: `polyglot-workflow-${nanoid()}`,
  });

  console.log(`Started workflow ${handle.workflowId}`);

  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
