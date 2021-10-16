import { useState } from 'react'
import { useForm } from 'react-hook-form'
import baseURL from 'context/baseURL'

const LiverpoolPush = () => {

  const [response, setResponse] = useState([])
  const [loading, setLoadig] = useState(false)
  
  const updateButton = async(data) => {

    await fetch(baseURL + '/liverpool/push',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      
    })
      .then(res => res.json())
      .then(res => setResponse(res.message))
      .catch(err => console.log(err))
      .finally(setLoadig(false))
  }
  
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = (data) => {
    setLoadig(true)
    updateButton(data)
  }
  
  const closeResponse = () => {
    setResponse([])
    reset()
  }

  return(
    <div className="access__bo__container">
    {
      response.length === 0 &&
      (
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Lista de órdenes</p>
          <textarea { ...register('conter') } />
          <button>Notificar</button>
        </form>
      )
    }
    
    {
      console.log(response, typeof response)
    }

    {
       loading 
       ? <p>Espere...</p> 
       : response.length > 0  && (
        <table className="response__liv__push" onClick={closeResponse}>
        <thead>
          <th>Codigo</th>
          <th>Guia</th>
          <th>Respuesta</th>
        </thead>
          <tbody>
          {
            response  !== null ?
            Object.values(response).map(({ res, guia, respuesta }) => {
              return(
              <tr>
                <td>{res}</td>
                <td>{guia}</td>
                <td><p>{respuesta}</p></td>
              </tr>
              )
            })
            : <p>La guia no existe</p>
          }
          </tbody>
         </table>
       )
    }
  </div>
  )
}

export default LiverpoolPush