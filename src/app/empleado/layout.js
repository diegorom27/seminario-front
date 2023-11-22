import NavBar from '../../components/global/NavBar'

const routes = [
    {
      name: 'Inicio',
      path: '/empleado/inicio',
      symbol: 'Home'
    },{
      name: 'Ver reservas',
      path: '/empleado/ver_reservas',
      symbol: 'token'
    },{
      name: 'Ver prestamos',
      path: '/empleado/ver_prestamos',
      symbol: 'token'
    },{
        name: 'Ver retornos',
        path: '/empleado/ver_retornos',
        symbol: 'token'
    },{
      name: 'Creditos',
      path: '/empleado/creditos',
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