import { ProcessManager } from '../process';

export class Scheduler {
  constructor(private pm: ProcessManager) {}

  start() {
    setInterval(() => {
      const ready = this.pm.getReadyProcesses();
      if (ready.length > 0) {
        const proc = ready[0];
        proc.state = 'running';
        proc.execute();
        proc.state = 'terminated';
      }
    }, 1000);
  }
}
