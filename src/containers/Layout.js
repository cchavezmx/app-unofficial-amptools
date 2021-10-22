import { useEffect, useState } from "react"
import Container from "./Container"
import { useHistory } from 'react-router-dom'

const Layout = ({ props }) => {

  const history = useHistory()
  const location = history.location.pathname.split('/')
    
  
  useEffect(() => {
    const activeButton = document.getElementById(location[1].toString())
    if (document.querySelector('.is_active')) {
      document.querySelector('.is_active').classList.remove('is_active')
    }
    return activeButton?.classList.add("is_active")

  }, [location])

  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const toogleHAmburger = () => setHamburgerOpen(!hamburgerOpen)

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
                id="accessbo"                
                onClick={() => history.push({ pathname: '/accessbo'})}>              
                Accesos
              </button>
              <button 
                id="permisosbo"   
                onClick={() => history.push({ pathname: '/permisosbo'})}>              
                Permisos 
              </button>
              <div className="separacion"></div>
              <p>Herramientas</p>
              <button 
                id="liverpoolpush"   
                onClick={() => history.push({ pathname: '/liverpoolpush'})}>              
                Notificaciones Liverpool 
              </button>
              <button 
                id="status"   
                onClick={() => history.push({ pathname: '/status'})}>              
                Cambio Masivo (Estatus) 
              </button>
              <button 
                id="searchorder"   
                onClick={() => history.push({ pathname: '/searchorder'})}>              
                Buscar Orden
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
