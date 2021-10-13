import { useForm } from 'react-hook-form'


const InditexBO = () => {

  const { register, handleSubmit} = useForm()

  const onSubmit = async ({ elmacho }) => {
    const reader = new FileReader()
    reader.onload = function(e) {
      console.log(e.target.result, "solo a terceros")
    }
    reader.readAsText(elmacho)

  }

  return(
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <form>
        <input
          type="text"
          id="reciever"
          {...register("reciever")}
        ></input>
        <input
          type="text"
          id="emailReceiver"
          {...register("emailReceiver")}
        ></input>
        <input
          type="text"
          id="phoneReceiver"
          {...register("phoneReceiver")}
        ></input>
        <input
          type="text"
          id="numberDestination"
          {...register("numberDestination")}
        ></input>
        <input
          type="text"
          id="CodePostalDestination"
          {...register("CodePostalDestination")}
        ></input>
        <input
          type="text"
          id="country"
          {...register("country")}
        ></input>
      </form>
      <button>Subir</button>
    </form>
  </div>
  )
}

export default InditexBO
