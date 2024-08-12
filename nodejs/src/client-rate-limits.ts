import { Connection, Client } from '@temporalio/client';
import { simpleExample, rateLimitExample } from './workflows';
import { nanoid } from 'nanoid';

const NUMBER_OF_WORKFLOW_EXECUTIONS = 10;

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

async function run() {
  try {
    const connection = await Connection.connect({ address: 'localhost:7233' });
    
    const client = new Client({
      connection,
    });

    const workflowExecutions = [];

    for(let i = 0; i < NUMBER_OF_WORKFLOW_EXECUTIONS; i++) {
      workflowExecutions.push(client.workflow.start(rateLimitExample, {
        taskQueue: 'polyglot-nodejs',
        args: [i],
        workflowId: `polyglot-${i}-${nanoid()}`,
      }));
    }


    console.log(`Start ${NUMBER_OF_WORKFLOW_EXECUTIONS} Workflow Executions`);
    const aTimer = new Timer();
    aTimer.start();
    const handles = await Promise.all(workflowExecutions);
    const results = handles.map((aHandle) => aHandle.result());
    
    await Promise.all(results);
    aTimer.stop();
    console.log(`${NUMBER_OF_WORKFLOW_EXECUTIONS} Workflow Executions Completed!`);
    console.log(`Total Time: \n${aTimer.display / 1000} seconds\n`);
    connection.close();
  } catch(e) {
    console.error(`Error!`, e);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
