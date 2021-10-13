import { useState } from 'react'
import { useMachine } from '@xstate/react'
import StatusMachine from 'context/statusMachine'


const StatusTool = () => {

  const [current, send] = useMachine(StatusMachine)

  const [counters, setCounters] = useState([])
  // const [currentStatus, setCurrentStatus] = useState(undefined)
  const [nextStatus, setNextStatus] = useState(undefined)
  const [logInsert, setLogInsert] = useState(undefined)

  const handledMachine = (e) => {
    e.preventDefault()
    
    const errors = {}

    if (counters.length === 0){
      errors['counters'] = undefined
    }

    if (nextStatus === null){
      errors['nextStatus'] = undefined
    }

    if (logInsert === null){
      errors['logInsert'] = undefined
    }

    if (Object.values(errors).length === 0) {

      console.log('AUER')
      const payload = {
        counters: counters.split('\n'),        
        nextStatus,
        logInsert
      }

      send('STATUS_CHMOD', { data: payload })
    }    
  }

  const handlelCleanInputs = () => {
    setCounters([])    
    setNextStatus(null)
    setLogInsert(null)
  }

  return(
    <div className="access__bo__container">
      {JSON.stringify(current.value)}
      <form onSubmit={handledMachine}>
        <p>Counters</p>
          <textarea
            value={counters}
            onChange={(e) => {            
              setCounters(e.target.value)
            }}
          >
          </textarea>
          {/* <small>Estado Actual</small>  
          <input value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value) }></input> */}
          <hr/>
          <small>Estado Solicitado</small>
          <input value={nextStatus} onChange={(e) => setNextStatus(e.target.value) }></input>  

          <small>Log de estatus</small>
          <input value={logInsert} onChange={(e) => setLogInsert(e.target.value) }></input>

          <div>
            <button>Enviar cambios</button>
            <button type="button" onClick={handlelCleanInputs}>Borrar</button>
          </div>
      </form>
    </div>
  )
}


export default StatusTool
