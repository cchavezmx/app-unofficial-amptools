import { createMachine, assign } from 'xstate'
import FetchHook from './FetchHook'

const getAccessStatus = async(ctx, data) => {
  const { email } = data.data
  
  const query = await FetchHook({
    url: `/backoffice/rulesbuttonbackend/status/${email}`,
    metohd: 'get',
  })

  if(query.message[0].rowCount === 0) throw new Error('El email no tiene permisos')
  return query
}

const grantAccess = async(ctx, data) => {
  const { email } = data.data  
  const query = await FetchHook({ 
    url: `/backoffice/rulesbuttonbackend?email=${email}`,
    metohd: 'post',
  })

  if(query.message !== 'changes applied succesfully') throw new Error('El email no tiene permisos')
  return query
}

const PermisosMachine = createMachine({
  id: 'permisosBO',
  initial: 'iddle',
  context: {
    userInfo: [],
    userData: [],
    error: [],
  },
  states: {
    iddle: {},
    success: {
      on: {
        RESET_FORM: {
          target: 'iddle',
          actions: (ctx) => ctx.userInfo = []
        }
      }
    },
    error: {
      on: {
        GET_ACCESS_STATUS: { target: 'grantAccess'}
      }
    },
    domainInvalid: {
      after: {
        4000: {
          target: 'iddle'
        }
      }
    },
    successAccsess: {
      on: {
        RESET_FORM: 'iddle'
      }
    },
    errorAccess: {
      on: {
        RESET_FORM: 'iddle'
      }
    },
    getAccessStatus: {
      invoke: {
        src: getAccessStatus,
        onDone: {
          target: 'success',
          actions: assign({
            userInfo: (ctx, event) => event.data.message,
            userData: (ctx, event) => event.data.userdata,
          })
        },
        onError: {
          target: 'error',
        }
      }
    },
    grantAccess: {
      invoke: {
        src: grantAccess,
        onDone: {
          target: 'successAccsess',
          actions: assign({
            userInfo: (ctx, event) => event.data
          })
        },
        onError: {
          target: 'errorAccess',
          actions: (ctx, event) => console.log(event.data)
        }
      }
    }

  },
  on: {
    'GET_ACCESS_STATUS': [
      {
        target: 'getAccessStatus',
        cond: (ctx, event) => {
           const { email } = event.data
           const emailDomain = email.split("@")
           if(emailDomain.includes('99minutos.com')){
             return true
           } else {
             return false
           }
        }
      },
      {
        target: ".domainInvalid"
      }

    ]
  }

})

export default PermisosMachine