import { Connection, Client } from '@temporalio/client';
import { example } from './workflows';
import { nanoid } from 'nanoid';

// Source: https://stackoverflow.com/questions/61708327/create-count-up-timer-with-typescript
export class Timer {
  startTime: Date;
  stopTime: Date;
  active: boolean;

  constructor() {
    this.startTime = new Date();
    this.stopTime = new Date();
    this.active = false;
  }

  get display() { return (this.startTime && this.stopTime) ? +this.stopTime - +this.startTime : 0 }

  timer() {
    if (this.active) {
      this.stopTime = new Date()
      setTimeout(()=>{
        this.timer()
      }, 1000)
    }
  }

  start() {
    this.startTime = new Date()
    this.stopTime = this.stopTime
    this.active = true
    this.timer()
  }

  stop() {
    this.stopTime = new Date()
    this.active = false
  }
}

async function kickStartWorkflows(numberOfWorkflowExecutions: number, args: any) {
  try {
    const connection = await Connection.connect({ address: 'localhost:7233' });
    
    const client = new Client({
      connection,
    });

    const workflowExecutions = [];

    for(let i = 0; i < numberOfWorkflowExecutions; i++) {
      const workflowId = `polyglot-${i}-${nanoid()}`;

      workflowExecutions.push(client.workflow.start(example, {
        workflowId,
        args,
        taskQueue: 'hello-world',
      }));
    }


    console.log(`Start ${numberOfWorkflowExecutions} Workflow Executions`);
    const aTimer = new Timer();
    aTimer.start();
    const handles = await Promise.all(workflowExecutions);
    const results = handles.map((aHandle) => aHandle.result());
    
    await Promise.all(results);
    aTimer.stop();
    console.log(`${numberOfWorkflowExecutions} Workflow Executions Completed!`);
    console.log(`Total Time: \n${aTimer.display / 1000} seconds\n`);
    connection.close();
  } catch(e) {
    console.error(`Error!`, e);
  }
}

async function run() {
  kickStartWorkflows(10, ['Temporal'])
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
