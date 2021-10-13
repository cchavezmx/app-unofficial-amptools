import { createMachine, assign } from 'xstate'
import FetchHook from './FetchHook'

export const getCatStation = async() => {

  const pCatStation = await new Promise((resolve) => {
    resolve(
      FetchHook({
        url: '/backoffice/catstation',
        metohd: 'get'
      })
    )
  }).then(res => res)

    
  return Promise.all([pCatStation])
    .then(res => res[0])
}

const getAccess = async(ctx, event) => {

   const { data } = event

   console.log(data)

    const query = await FetchHook({
      url: '/backoffice/accesstouser',
      data: data,
      metohd: 'post'
    })
    return query
}

const getUser = async(ctx, event) => {

  const { email } = event.data

    const query = await FetchHook({
      url: `/backoffice/getuser/email?email=${email}`,
      data: event.data,
      metohd: 'get'
    })

    if( query.message.rowCount > 0) {
      const { rows } = query.message
      
      ctx.userinfo = rows
      throw new Error('El usuario ya existe')
    }

    return query.message
}

const BoMachine = createMachine({
  id: 'bomachine',
  initial: 'iddle',
  context: {
    userinfo: [],
    error: []
  },
  states: {
    iddle: {},
    confirm: {
      on: {
        POST_ACCESS_BO: { target: 'getAccess' }
      }
    },
    addToBackDB: {
      on: {
        POST_ACCESS_BO: { target: 'addToBackDBConfirm' }
      }
    },
    addToBackDBConfirm: {
      invoke: {
        src: getAccess,
        onDone: {
          target: 'success',
          actions: assign({
            userinfo: (ctx, event) =>  event.data
          })
        },
        onError: {
          target: 'error',
          actions: assign({
            error: (ctx, event) => event.data
          })
        }
      }
    },
    showUser:{
      on: {
        RESET: 'iddle'
      }
    },
    // verificamos si el usuario existe
    getAccess: {
      invoke: {
        src: getUser,
        onDone: {
          target: 'addToBackDB',
        },
        onError: {
          target: 'showUser'
        }
        
      }
    },
    domainInvalid: {
      after: {
        3000: {
          target: 'iddle'
        }
      }
    },
    success: {
      after: {
        10000: {
          target: 'iddle'
        }
      }
    },
    error: {}
  },
  on: {
    POST_ACCESS_BO: [
      {
        target: 'confirm',
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
    ],
    RESET: 'iddle',
  }
})

export default BoMachine