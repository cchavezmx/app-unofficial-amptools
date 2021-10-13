import { useEffect, useState } from "react"
import Container from "./Container"
import { useHistory } from 'react-router-dom'

const Layout = ({ props }) => {

  const history = useHistory()
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const toogleHAmburger = () => setHamburgerOpen(!hamburgerOpen)

  const handledSelectOption = () => {
    const buttons = document.querySelectorAll('button')

    buttons.forEach(button => {

      button.addEventListener('click', ({ target }) => {             

          if (document.querySelector('.is_active')) {
            document.querySelector('.is_active').classList.remove('is_active')
          }

          return target.classList.add("is_active")
      })
    })
  }

  useEffect(() => {
    handledSelectOption()
  }, [])

  return (
    <div className="App__container">
        <div className="App__header">
          <nav>

            <div>
              <span 
                onClick={toogleHAmburger}
                className={hamburgerOpen ? "hamburger__button" : "hamburger__button__open hamburger__button"}> 
                <span></span>
                <span></span>
                <span></span>
              </span>
              <a href="/">
                <img src="https://bo-99minutos.web.app/static/media/99-logo.82e437d3.svg" alt="logo de la empresa reloj dentro con el numero marca 99"/>
              </a>
            </div>

            <div>
              <a href="/" className="mr-3">
                Login
              </a>
            </div>
          </nav>
        </div>
        <div className="App__Slidebar" hidden={hamburgerOpen}>
            {/* logo y pequeño menu de usuario */}
            <nav>
              <div className="separacion"></div>
              <p>Backoffice</p>
              <button
                className="is_active"                
                onClick={() => history.push({ pathname: '/accessbo'})}>              
                Accesos
              </button>
              <button 
                onClick={() => history.push({ pathname: '/permisosbo'})}>              
                Permisos 
              </button>
              <div className="separacion"></div>
              <p>Herramientas</p>
              <button 
                onClick={() => history.push({ pathname: '/liverpoolpush'})}>              
                Notificaciones Liverpool 
              </button>
              <button 
                onClick={() => history.push({ pathname: '/status'})}>              
                Cambio Masivo (Estatus) 
              </button>
            </nav>
          </div>
        <section className="App__body">
          <Container {...props} />
        </section>
        <div className="App__footer">

        </div>
    </div>
  )
}

export default Layout
