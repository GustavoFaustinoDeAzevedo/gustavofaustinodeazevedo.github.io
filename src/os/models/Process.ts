import { ProcessProfile } from '../types';

export type Policy = 'FIFO' | 'RR' | 'CFS';
export type State = 'ready' | 'running' | 'waiting' | 'terminated';
export type Profile = 'editor' | 'reader' | 'logger' | 'deleter';
export type ProcessState = 'ready' | 'running' | 'waiting' | 'terminated';

export class Process {
  public vruntime = 0;
  public state: ProcessState = 'waiting';

  constructor(
    public pid: number,
    public name: string,
    public policy: Policy,
    public priority: number,
    public runtimeNeeded: number,
    public memorySize: number,
    public profile: ProcessProfile = 'editor'
  ) {}
}

// export default Process;
