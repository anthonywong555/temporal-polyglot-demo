import { NativeConnection, Worker } from '@temporalio/worker';

async function run() {
  const connection = await NativeConnection.connect({
    address: 'localhost:7233',
  });

  const worker = await Worker.create({
    connection,
    namespace: 'default',
    taskQueue: 'hello-world',
    workflowsPath: require.resolve('./workflows'),
    dataConverter: { payloadConverterPath: require.resolve('./payload-converter') }
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
