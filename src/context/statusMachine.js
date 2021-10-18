import { createMachine, assign } from 'xstate'
import FetchHook from './FetchHook'

const chmod = async (ctx, evt) => {

  const order = await FetchHook({
    url: '/orders/chmod',
    metohd :'patch',
    data: evt.data

  })
  console.log({ order }, 'midu')
  return order

}

const StatusMachine = createMachine({
  initial: 'iddle',
  context: {
    results: []
  },
  states: {
    iddle: {},
    success: {
      after: {
        4000: {
          target: 'iddle'
        }
      }
    },
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