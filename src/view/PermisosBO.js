import { useForm } from 'react-hook-form'
import { useMachine } from '@xstate/react'
import PermisosMachine from 'context/PermisosMachine'
import InputBox from 'components/InputBox'

const PermisosBO = () => {

  const { register, handleSubmit, reset } = useForm()
  const [state, send] = useMachine(PermisosMachine)

  const onSubmit = (data) => {
    send('GET_ACCESS_STATUS', { data })
  }

  const handleResetSubmit = () => {
    reset()
    send('RESET_FORM')
  }

  const { userInfo, userData } = state.context
    
  return (
    <div className="access__bo__container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Asignación de Botones Backoffice
            </label>
            <label>
            <input
              required
              {...register('email', { required: true })}
              type="email"
              placeholder="Ingrese el correo"
            ></input>
            </label>
            {state.matches("iddle") && <button>Revisar Permsios</button>}
            {
              state.matches("getAccessStatus") && 
              <span className="await__logo"></span>
            }
            {
              state.matches("success") &&
              userInfo
                .map(val => {
                return val.rows
                .sort((a, b) => a.button + b.button)
                .map(({ button, active }, index)=> {
                  return (
                    <ul>
                        <li className={index % 2 === 1 ? "style_2n" : "style_1n" }>
                          <label>{ button }</label>
                          <InputBox checked={active} button={button} userid={userData?.rows[0]?.id} />
                        </li>
                    </ul>
                  )
                })
              })
            }
            {
              state.matches('success') && 
              <button 
                type="button"
                onClick={handleResetSubmit}
              >
                Regresar
              </button>            
            }
            {
              state.matches("domainInvalid") && 
              <span className="alert__invalid">El correo no pertenece a 99minutos</span>
            }
            {
              state.matches("error") &&
              <span className="info__error__acceso">
                <p>El email aún no cuenta con permisos</p>
                {
                  <span>
                    <div>
                      <button type="submit">Añadir permisos</button>
                    </div>
                  </span>
                }
              </span>
            }
            {
              state.matches("successAccsess") &&
            <>
              <p>¡Cambios aplicados con exito!</p>
              <button 
                type="button"
                onClick={handleResetSubmit}
              >
                Agragar nuevo correo
              </button>
            </>
            }
            {
              state.matches("errorAccess") &&
            <>
              <p>El correo no esta en backoffice</p>
              <button 
                type="button"
                onClick={handleResetSubmit}
              >
                Regresar
              </button>
            </>
            }
        </form>
    </div>
  )
}

export default PermisosBO