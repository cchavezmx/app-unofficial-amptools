import check from 'assets/icons/check-circle.svg'

const AlertNotify = ({ title, body }) => {

  return (    
      <div className="alert__notify">
        <img src={check} alt='check-done' />
        <h3>{ title }</h3>
        <p>{ body }</p>
      </div>    
  )
}

export default AlertNotify