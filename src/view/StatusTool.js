import { useForm } from 'react-hook-form'
import { useMachine } from '@xstate/react'
import StatusMachine from 'context/statusMachine'
import AlertNotify from 'components/AlertNotify'


const StatusTool = () => {

  const [current, send] = useMachine(StatusMachine)
  const { register, handleSubmit, formState:{ errors }, reset } = useForm({
    defaultValues: {
      reactivate: true
    }
  })

  const handledSubmit = (data) => {
    const payload = {
      counters: data.counters.split('\n'),        
      nextStatus: data.nextStatus,
      logInsert: data.logInsert,      
    }    

    console.log(payload)

    send('STATUS_CHMOD', { data: payload })
  }

  return(
    <div className="access__bo__container">
      { current.value }
      <form onSubmit={handleSubmit(handledSubmit)}>
        <p>Counters</p>
          <textarea
            {...register('counters')} 
            id="counters"
            name='counters'
          >
          </textarea>
          <hr/>          
          <div className="mt-5"></div>
          
          <small>Estado Solicitado</small>
          <input {...register('nextStatus')} id="nextStatus" name="nextStatus" ></input> 
              
            <small>Log de estatus</small>
            <input {...register('logInsert')} id="logInsert" name="logInsert"></input>

          <div>
            <button>Enviar cambios</button>
            <button type="button" onClick={() => reset()}>Borrar</button>
          </div>
      </form>
      { current.matches('success')  && <AlertNotify title="Cambios guardados"/> }
    </div>
  )
}


export default StatusTool
