import { MemoryManager } from '../managers';
import { Process } from '../models';
import { FileSystem } from '../filesystem';
import { type ProcessProfile, type Policy } from '../types';

class ProcessManager {
  private realtimeQueue: Process[] = [];
  private normalQueue: Process[] = [];
  private waitingQueue: Process[] = [];
  private completed: Process[] = [];
  private pidCounter = 0;

  constructor(private memory: MemoryManager, private fileSystem: FileSystem) {}

  createProcess(
    name: string,
    policy: Policy,
    priority: number,
    runtimeNeeded: number,
    memorySize: number,
    profile: ProcessProfile
  ): Process {
    const proc = new Process(
      this.pidCounter++,
      name,
      policy,
      priority,
      runtimeNeeded,
      memorySize,
      profile
    );

    if (this.memory.allocate(proc.pid, memorySize)) {
      proc.state = 'ready';
      this.enqueue(proc);
    } else {
      this.waitingQueue.push(proc);
    }

    return proc;
  }

  private enqueue(proc: Process) {
    if (proc.policy === 'FIFO' || proc.policy === 'RR') {
      this.realtimeQueue.push(proc);
    } else {
      this.normalQueue.push(proc);
    }
  }

  // terminateProcess(pid: number) {
  //   const index = this.getProcesses().findIndex((p) => p.pid === pid);
  //   if (index !== -1) {
  //     this.completed.push(this.getProcesses()[index]);
  //     this.getProcesses().splice(index, 1);
  //   }
  // }

  terminateProcess(pid: number) {
    const proc = this.getProcessByPid(pid);
    if (!proc) return false;
    proc.state = 'terminated';

    this.memory.free(pid);

    this.realtimeQueue = this.realtimeQueue.filter((p) => p.pid !== pid);
    this.normalQueue = this.normalQueue.filter((p) => p.pid !== pid);
    this.waitingQueue = this.waitingQueue.filter((p) => p.pid !== pid);

    this.completed = [...this.completed, proc];

    this.admitWaiting();

    console.log(`Processo ${proc.name} (PID ${pid}) finalizado`);
  }

  private admitWaiting() {
    const admitted: Process[] = [];
    this.waitingQueue = this.waitingQueue.filter((p) => {
      if (this.memory.allocate(p.pid, p.memorySize)) {
        p.state = 'ready';
        this.enqueue(p);
        admitted.push(p);
        return false;
      }
      return true;
    });
  }

  sysCreateFile(proc: Process, name: string, content: string) {
    return this.fileSystem.createFile(proc.pid, name, content);
  }

  sysReadFile(proc: Process, name: string) {
    return this.fileSystem.readFile(proc.pid, name);
  }

  sysWriteFile(proc: Process, name: string, content: string) {
    return this.fileSystem.writeFile(proc.pid, name, content);
  }

  sysDeleteFile(proc: Process, name: string) {
    return this.fileSystem.deleteFile(proc.pid, name);
  }

  getNextProcess(): Process | null {
    // Tempo real primeiro (FIFO e RR)
    if (this.realtimeQueue.length > 0) {
      const proc = this.realtimeQueue.shift()!;

      if (proc.policy === 'RR') {
        // RR: volta pro fim da fila se não terminar
        // (o Scheduler vai chamar updateAfterRun depois)
        this.realtimeQueue.push(proc);
      }

      return proc;
    }

    // Classe normal (CFS)
    if (this.normalQueue.length > 0) {
      // Ordena pelo menor vruntime
      this.normalQueue.sort((a, b) => a.vruntime - b.vruntime);
      return this.normalQueue.shift()!;
    }

    // Nada para executar
    return null;
  }

  updateAfterRun(proc: Process, timeRun: number) {
    proc.runtimeNeeded -= timeRun;

    if (proc.policy === 'CFS') {
      proc.vruntime += timeRun / (proc.priority + 1);
    }

    if (proc.runtimeNeeded > 0) {
      proc.state = 'ready';
      this.enqueue(proc);
    } else {
      this.terminateProcess(proc.pid);
    }
  }

  getProcesses() {
    return [...this.realtimeQueue, ...this.normalQueue, ...this.waitingQueue];
  }

  getWaitingProcesses() {
    return this.waitingQueue;
  }

  getRunningProcesses() {
    return [...this.realtimeQueue, ...this.normalQueue];
  }

  getState() {
    return {
      realtimeQueue: [...this.realtimeQueue],
      normalQueue: [...this.normalQueue],
      waitingQueue: [...this.waitingQueue],
      completed: [...this.completed],
    };
  }

  getTerminatedProcesses() {
    return this.getProcesses().filter((p) => p.state === 'terminated');
  }

  getReadyProcesses() {
    return this.getProcesses().filter((p) => p.state === 'ready');
  }

  getCompletedProcesses() {
    return [...this.completed];
  }

  getProcessesByPolicy(policy: Policy) {
    return this.getProcesses().filter((p) => p.policy === policy);
  }

  getProcessesByPriority(priority: number) {
    return this.getProcesses().filter((p) => p.priority === priority);
  }

  getProcessByPid(pid: number) {
    return this.getProcesses().find((p) => p.pid === pid);
  }

  getProcessByName(name: string) {
    return this.getProcesses().find((p) => p.name === name);
  }
}

export default ProcessManager;
