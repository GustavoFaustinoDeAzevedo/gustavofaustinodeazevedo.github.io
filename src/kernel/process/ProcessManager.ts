type ProcessState = 'ready' | 'running' | 'waiting' | 'terminated';

interface Process {
  pid: number;
  name: string;
  state: ProcessState;
  execute: () => void;
}

export class ProcessManager {
  private processes: Process[] = [];
  private pidCounter = 0;

  create(name: string) {
    const process: Process = {
      pid: this.pidCounter++,
      name,
      state: 'ready',
      execute: () => console.log(`Executando ${name}`),
    };
    this.processes.push(process);
  }

  getReadyProcesses() {
    return this.processes.filter((p) => p.state === 'ready');
  }
}
