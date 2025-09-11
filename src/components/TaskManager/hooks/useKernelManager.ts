// hooks/useKernelManager.ts
import { useEffect, useState } from 'react';
import Kernel from '@/os';

const useKernelManager = () => {
  const [kernel, setKernel] = useState(() => new Kernel());
  const [state, setState] = useState<any>(null);

  // console.log(kernel);
  useEffect(() => {
    // Criação de processos iniciais
    kernel.createProcess('EditorApp', 'CFS', 1, 1000, 128, 'editor');
    kernel.createProcess('ReaderApp', 'RR', 0, 800, 64, 'reader');
    kernel.createProcess('LoggerService', 'FIFO', 0, 600, 32, 'logger');
    kernel.createProcess('Cleaner', 'CFS', 2, 500, 64, 'deleter');

    // Inicia o Kernel
    kernel.boot();

    // Atualiza o estado periodicamente
    const interval = setInterval(() => {
      const snapshot = kernel.getProcessState();
      setState(snapshot);
    }, 1000);

    return () => clearInterval(interval);
  }, [kernel]);

  return {
    kernel,
    state,
    createProcess: kernel.createProcess.bind(kernel),
    killProcess: kernel.killProcess.bind(kernel),
    getState: kernel.getProcessState.bind(kernel),
  };
};

export default useKernelManager;
