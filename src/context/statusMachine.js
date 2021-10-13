import { createMachine, assign } from 'xstate'
import FetchHook from './FetchHook'

const chmod = async (ctx, evt) => {

  await FetchHook({
    url: '/orders/chmod',
    metohd :'patch',
    data: evt.data

  })

}

const StatusMachine = createMachine({
  initial: 'iddle',
  context: {
    results: []
  },
  states: {
    iddle: {},
    success: {},
    error: {},
    chmodStatus: {
      invoke: {
        src: chmod,
        onDone: {
          target: 'success',
          actions: assign({
            results: (ctx, evt) => evt.data
          })
        },
        onError: {
          target: 'error'
        }
      }
    }
  },
  on: {
    STATUS_CHMOD: {
      target: 'chmodStatus'
    }
  }
})

export default StatusMachine