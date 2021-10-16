import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMachine } from '@xstate/react'
import StatusMachine from 'context/statusMachine'


const StatusTool = () => {

  const [current, send] = useMachine(StatusMachine)

  const [counters, setCounters] = useState([])
  const { register, handleSubmit, formState:{ errors }, watch, reset } = useForm({
    defaultValues: {
      reactivate: true
    }
  })

  const reactiveWatch = watch('reactivate')
  const handledSubmit = (data) => {

    const payload = {
      counters: counters.split('\n'),        
      nextStatus: data.nextStatus,
      logInsert: data.logInsert,
      reactivate: data.reactivate
    }

    console.log(data, payload)
    send('STATUS_CHMOD', { data: payload })
  }

  console.log(reactiveWatch)

  return(
    <div className="access__bo__container">

      <form onSubmit={handleSubmit(handledSubmit)}>
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
          <span>
          <small>Reactivar guia</small>
            <input type="checkbox" {...register('reactivate')} id='reactivate' name="reactivate"></input> 
          </span> 
          <div className="mt-5"></div>
          {
              !reactiveWatch && (
              <>
                <small>Estado Solicitado</small>
                <input {...register('nextStatus')} id="nextStatus" name="reactivate" ></input> 
              </>
              )            
          }

            <small>Log de estatus</small>
            <input {...register('loginsert')} id="loginsert" name="loginsert"></input>

          <div>
            <button>Enviar cambios</button>
            <button type="button" onClick={() => reset()}>Borrar</button>
          </div>
      </form>
    </div>
  )
}


export default StatusTool
