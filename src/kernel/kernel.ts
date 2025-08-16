import { ProcessManager } from './process';
import { Scheduler } from './scheduler';

export class Kernel {
  private processManager: ProcessManager;
  private scheduler: Scheduler;

  constructor() {
    this.processManager = new ProcessManager();
    this.scheduler = new Scheduler(this.processManager);
  }

  boot() {
    console.log('Kernel iniciado');
    this.scheduler.start();
  }

  createProcess(name: string) {
    this.processManager.create(name);
  }
}
