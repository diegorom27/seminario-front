import NavBar from '../../components/global/NavBar.jsx'

const routes = [
    {
      name: 'Inicio',
      path: '/estudiante/inicio',
      symbol: 'Home'
    },
    {
      name: 'Reservar',
      path: '/estudiante/registrar_reserva',
      symbol: 'token'
    }, {
      name: 'Ver reservas',
      path: '/estudiante/ver_reserva',
      symbol: 'token'
    },{
      name: 'Log out',
      path: '/',
      symbol: 'Logout'
    },
  ]  

export default function Layout ({ children }) {
    return (
        <>
          <NavBar routes={routes}/>
          {children}
        </>
    )
  }
  