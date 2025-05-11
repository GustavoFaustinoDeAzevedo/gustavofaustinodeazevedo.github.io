import { createMachine, assign } from 'xstate';
import actions from '../store/actions';


export const windowMachine = createMachine({
  id: 'osWindow',
  initial: 'unset',
  context: {
    previousPosition: { x: 100, y: 100 },
    previousSize: { width: 400, height: 300 },
    handler: () => { },
  },
  states: {
    unset: {
      on: {
        OPEN: {
          terget: 'windowed',
          actions: assign({
            handler: (context, event) => event.onFocus()
          })
        }
      }
    },
    windowed: {
      on: {
        MINIMIZE: {
          target: 'minimized',
          actions: assign({
            previousPosition: (context, event) => ({ x: event.x, y: event.y }),
            handler: (context, event) => event()
          })
        },
        MAXIMIZE: {
          target: 'maximized',
          actions: assign({
            previousSize: (context, event) => ({ width: event.width, height: event.height }),
            handler: (context, event) => event()
          })
        },
        CLOSE: 'closed'
      }
    },
    minimized: {
      on: {
        RESTORE: {
          target: 'windowed',
          actions: assign({
            handler: (context, event) => event()
          })
        }
      }
    },
    maximized: {
      on: {
        RESTORE: {
          target: 'windowed',
          actions: assign({
            handler: (context, event) => event()
          })
        }
      }
    },
    closed: {
      type: 'final',
      entry: assign({
        handler: (context, event) => event()
      }),
    }
  }
});
