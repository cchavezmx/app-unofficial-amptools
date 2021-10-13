import { useForm } from 'react-hook-form'
import { useMachine } from '@xstate/react'
import BoMachine from 'context/BoMachine'

import { getCatStation } from 'context/BoMachine'
import { useEffect, useState } from 'react'

const AccessBO = () => {

  const { handleSubmit, register, reset, watch } = useForm()
  const watchEmail = watch('email')


  const [state, send] = useMachine(BoMachine)
  const onSubmit = (data) => {

    const payload = {
      country: data.country,
      email: data.email, 
      stationid: data.stationid === "Seleccione estación" ? 0 : data.stationid
    }

    send('POST_ACCESS_BO', { data: payload })
    if(state.matches('success')) reset()
  }

  const handleReset = () => {
    send('RESET')
    reset()
  }

  const [staionId, setStaionId] = useState([])
  const stations = async() => await getCatStation()
  useEffect(() => {
    stations()
      .then(res => setStaionId(res.message))
  }, [])
  

  const { userinfo } = state.context

  return(
    <div className="access__bo__container">
          {
            state.matches('domainInvalid') && 
            <span className="alert__invalid">El correo no pertenece a 99minutos</span>
          }
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Añadir Correo a Backoffice
            <input
                placeholder="Ingresa el email que necesita dar acceso"
                id="email"
                required
                type="email"
                {...register('email', { required: true })}
              >
            </input>
            <select
              {...register('country', { required: true })}
            >
                <option value="MEX">México</option>
                <option value="CHL">Chile</option>
                <option value="COL">Colombia</option>
                <option value="PER">Perú</option>
            </select>
            <select {...register('stationid')}>
              <option>Seleccione estación</option>
              {
                Object.values(staionId).map(station => {
                  return <option value={station.id}>{ station.name + "\n" + station.code }</option>
                })
              }
            </select>
            {
              state.matches("iddle") &&
              <button>Continuar</button>
            }
        </label>
          {
            state.matches("confirm") && 
            <span className="info__error__acceso">
              <span>
                <section>
                <div>
                  <p>¿Desea verificar acceso previo de la cuenta?</p>
                  <p>{ watchEmail }</p>
                  <button type="button" onClick={handleReset}>Cancelar</button>
                  <button>{state.matches("success") ? "Borrar consulta" : "Continuar"}</button>
                </div>
                </section>
              </span>
              
            </span>
          }          
          { 
            state.matches("addToBackDB") &&
            <>
              <small>¿El usario no existe en backoffice desea continuar?</small>
              <button>Continuar</button>
            </>
          }          
        <span>
          {
            state.matches('success') && 
            !userinfo.duplicated && 
            <span className="info__error__acceso">
              Usuario añadido a userbackoffice database
              <button onClick={handleReset} type="button">Añadir otro email</button>
            </span>
          }
          {
            state.matches('showUser') && 
            <span className="info__error__acceso">
              <p>El usuario ya cuenta con acceso a BO</p>
              <section>
                {
                  Object.values(userinfo).map(val => {
                    return (
                      <div>
                      <span>
                        <p>id:</p>
                        <p>{val.id}</p>
                      </span>
                      <span>
                        <p>isblocked</p>
                        <p>{JSON.stringify(val.isblocked)}</p>
                      </span>
                      <span>
                        <p>created:</p>
                        <p>{val.created}</p>
                      </span>
                      <span>
                        <p>lastlogin:</p>
                        <p>{val.lastlogin}</p>
                      </span>
                      <span>
                        <p>country</p>
                        <p>{val.country}</p>
                      </span>
                      <span>
                        <p>username:</p>
                        <p>{val.username}</p>
                      </span>
                      <span>
                        <p>email_address:</p>
                        <p>{val.email_address}</p>
                      </span>
                      <span>
                        <p>stationid:</p>
                        <p>{val.stationid}</p>
                      </span>
                    </div>
                    )
                  })
                }
              </section>
              <div className="mb-3"/>
              <button onClick={handleReset} type="button">Regresar</button>
            </span>              
            }
        </span>

      </form>

    </div>
  )
}

export default AccessBO