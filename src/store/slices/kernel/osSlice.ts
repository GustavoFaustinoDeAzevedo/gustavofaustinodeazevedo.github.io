import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { Process } from '@/os/components/process';
// import { type MemoryManager, type FileEntry } from '@/os';

interface OSState {
  processes: Process[];
  readyQueue: Process[];
  waitingQueue: Process[];
  completed: Process[];
  memory: {
    total: number;
    used: number;
    free: number;
    percentUsed: number;
  };
  filesystem: {
    total: number;
    used: number;
    free: number;
    files: FileEntry[];
  };
}

const initialState: OSState = {
  processes: [],
  readyQueue: [],
  waitingQueue: [],
  completed: [],
  memory: { total: 0, used: 0, free: 0, percentUsed: 0 },
  filesystem: { total: 0, used: 0, free: 0, files: [] },
};

export const osSlice = createSlice({
  name: 'os',
  initialState,
  reducers: {
    setProcesses(state, action: PayloadAction<Process[]>) {
      state.processes = action.payload;
    },
    setReadyQueue(state, action: PayloadAction<Process[]>) {
      state.readyQueue = action.payload;
    },
    setWaitingQueue(state, action: PayloadAction<Process[]>) {
      state.waitingQueue = action.payload;
    },
    setCompleted(state, action: PayloadAction<Process[]>) {
      state.completed = action.payload;
    },
    setMemory(state, action: PayloadAction<OSState['memory']>) {
      state.memory = action.payload;
    },
    setFilesystem(state, action: PayloadAction<OSState['filesystem']>) {
      state.filesystem = action.payload;
    },
  },
});

export const {
  setProcesses,
  setReadyQueue,
  setWaitingQueue,
  setCompleted,
  setMemory,
  setFilesystem,
} = osSlice.actions;

export default osSlice.reducer;
