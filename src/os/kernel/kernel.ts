import { MemoryManager, ProcessManager, UserManager } from '../managers';
import Scheduler from '../core';
import { FileSystem } from '../filesystem';
import { type AppDispatch } from '@/store';
import type { ProcessProfile, Policy } from '../types';

class Kernel {
  private memoryManager: MemoryManager;
  private processManager: ProcessManager;
  private userManager: UserManager;
  private scheduler: Scheduler;
  private fileSystem: FileSystem;

  constructor(
    // private dispatch: AppDispatch,
    private totalMemory = 1024, // MB
    private cores = 2,
    private quantum = 1000
  ) {
    this.fileSystem = new FileSystem(1024); // 1KB de espaço total
    this.memoryManager = new MemoryManager(this.totalMemory);
    this.processManager = new ProcessManager(
      this.memoryManager,
      this.fileSystem
    );
    this.userManager = new UserManager();
    this.scheduler = new Scheduler(
      this.processManager,
      this.userManager,
      this.cores,
      this.quantum
    );
  }

  boot() {
    // this.realTimeQueue = [];
    // this.normalQueue = [];
    // this.waitingQueue = [];
    console.log(
      `Kernel iniciado | RAM=${this.totalMemory}MB | cores=${this.cores} | quantum=${this.quantum}ms`
    );
    this.scheduler.start();
  }

  stop() {
    // this.scheduler.stop();
    console.log('Kernel parado');
  }

  // Criação direta de processos
  createProcess(
    name: string,
    policy: Policy = 'CFS',
    priority = 0,
    runtimeNeededMs = 1000,
    memorySizeMb = 128,
    profile: ProcessProfile = 'editor'
  ) {
    return this.processManager.createProcess(
      name,
      policy,
      priority,
      runtimeNeededMs,
      memorySizeMb,
      profile
    );
  }

  // Metodos de Arquivos

  createFile(pid: number, name: string, content: string) {
    return this.fileSystem.createFile(pid, name, content);
  }

  readFile(pid: number, name: string) {
    return this.fileSystem.readFile(pid, name);
  }

  writeFile(pid: number, name: string, content: string) {
    return this.fileSystem.writeFile(pid, name, content);
  }

  deleteFile(pid: number, name: string) {
    return this.fileSystem.deleteFile(pid, name);
  }

  listFiles() {
    return this.fileSystem.listFiles();
  }

  getFileSystemStats() {
    return this.fileSystem.getStats();
  }

  // Metodos de Memória

  getMemoryStats() {
    return this.memoryManager.getMemoryStats();
  }

  // Metodos de Processos

  killProcess(pid: number): boolean {
    const process = this.processManager.getProcessByPid(pid);
    if (!process) return false;

    this.processManager.terminateProcess(pid);
    return true;
  }

  getProcessState() {
    return this.processManager.getState();
  }

  getProcesses() {
    return this.processManager.getProcesses();
  }
  getReadyProcesses() {
    return this.processManager.getReadyProcesses();
  }
  getWaitingProcesses() {
    return this.processManager.getWaitingProcesses();
  }
  getRunningProcesses() {
    return this.processManager.getRunningProcesses();
  }
  getTerminatedProcesses() {
    return this.processManager.getTerminatedProcesses();
  }
  getCompletedProcesses() {
    return this.processManager.getCompletedProcesses();
  }
  getProcessesByPolicy(policy: Policy) {
    return this.processManager.getProcessesByPolicy(policy);
  }
  getProcessesByPriority(priority: number) {
    return this.processManager.getProcessesByPriority(priority);
  }
  getProcessByPid(pid: number) {
    return this.processManager.getProcessByPid(pid);
  }
  getProcessByName(name: string) {
    return this.processManager.getProcessByName(name);
  }
}

export default Kernel;
