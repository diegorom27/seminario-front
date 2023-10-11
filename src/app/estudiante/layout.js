import NavBar from '../../components/global/NavBar.jsx'

const routes = [
    /*
    {
      name: 'Log in',
      path: '/',
      symbol: 'Home'
    },
    */
    {
      name: 'Reservar',
      path: '/estudiante/registrar_reserva',
      symbol: 'token'
    }, {
      name: 'Ver reservas',
      path: '/estudiante/ver_reserva',
      symbol: 'token'
    }
  ]  

export default function Layout ({ children }) {
    return (
        <>
          <NavBar routes={routes}/>
          {children}
        </>
    )
  }
  