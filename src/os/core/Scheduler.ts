import { ProcessManager, UserManager } from '../managers';
import { Process } from '../models';

class Scheduler {
  constructor(
    private pm: ProcessManager,
    private um: UserManager,
    private cores: number,
    private quantum: number
  ) {}

  start() {
    setInterval(() => {
      let anyRunning = false;
      for (let i = 0; i < this.cores; i++) {
        const proc = this.pm.getNextProcess();
        if (proc) {
          anyRunning = true;
          const runTime = Math.min(this.quantum, proc.runtimeNeeded);
          proc.runtimeNeeded -= runTime;
          console.log(`Core ${i} → ${proc.name} rodou ${runTime}ms`);

          this.simulateFileSyscall(proc);

          if (proc.runtimeNeeded <= 0) this.pm.terminateProcess(proc.pid);
          else this.pm.updateAfterRun(proc, runTime);
        }
      }
      if (!anyRunning) console.log('🏁 Todos os processos finalizados');
    }, this.quantum);
  }

  private simulateFileSyscall(proc: Process) {
    const fileName = `file_${proc.pid}.txt`;
    switch (proc.profile) {
      case 'editor':
        this.weightedAction(
          [
            () =>
              this.pm.sysCreateFile(
                proc,
                fileName,
                `Conteúdo inicial de ${proc.name}`
              ),
            () =>
              this.pm.sysWriteFile(
                proc,
                fileName,
                `Edição de ${proc.name} @${Date.now()}`
              ),
            () => this.pm.sysReadFile(proc, fileName),
            () => this.pm.sysDeleteFile(proc, fileName),
          ],
          [0.3, 0.3, 0.3, 0.1]
        );
        break;

      case 'reader':
        this.weightedAction(
          [
            () => this.pm.sysReadFile(proc, fileName),
            () =>
              this.pm.sysCreateFile(
                proc,
                fileName,
                `Arquivo criado por ${proc.name}`
              ),
            () =>
              this.pm.sysWriteFile(
                proc,
                fileName,
                `Atualização por ${proc.name}`
              ),
          ],
          [0.7, 0.2, 0.1]
        );
        break;

      case 'logger':
        // Sempre escreve no mesmo arquivo (append)
        this.pm.sysWriteFile(
          proc,
          fileName,
          `Log @${new Date().toISOString()}`
        );
        break;

      case 'deleter':
        this.weightedAction(
          [
            () => this.pm.sysDeleteFile(proc, fileName),
            () =>
              this.pm.sysCreateFile(
                proc,
                fileName,
                `Arquivo temporário de ${proc.name}`
              ),
            () => this.pm.sysReadFile(proc, fileName),
          ],
          [0.5, 0.3, 0.2]
        );
        break;
    }
  }

  private weightedAction(actions: (() => void)[], weights: number[]) {
    const total = weights.reduce((a, b) => a + b, 0);
    const rand = Math.random() * total;
    let sum = 0;
    for (let i = 0; i < actions.length; i++) {
      sum += weights[i];
      if (rand <= sum) {
        actions[i]();
        return;
      }
    }
  }
}

export default Scheduler;
