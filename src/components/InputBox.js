import { useState } from "react"
import baseURL from 'context/baseURL'

const InputBox = (payloadData) => {  
  const [selected, setSelected] = useState(payloadData.checked)
  const [loading, setLoadig] = useState(false)
  
  const updateButton = async() => {

    const payload = {
      ...payloadData,
      active: !selected
    }

    await fetch(baseURL + '/backoffice/update/rulesbuttonbackend',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
      
    })
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.log(err))
      .finally(setLoadig(false))
  }

  const handleSelected = async(e) => {
    setLoadig(true)
    setSelected(!selected)
    await updateButton()
  }

  return(
    <>
      {!loading && <input type="checkbox" checked={selected} onChange={handleSelected}></input>}
      {
        loading && <span>Modificando...</span>
      }
    </>
  )
}

export default InputBox