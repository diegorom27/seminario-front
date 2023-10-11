import { NextResponse } from 'next/server'
import server from './assets/server' 
import { get } from './helpers/helperHttp'
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    let {protocol,domain,port}= server
    let token = request.cookies.get('token')
    const url = `${protocol}://${domain}:${port}`
    const res = await get(`${url}/token/actual-usuario/`,{
      headers: {
      'Content-Type': "application/json;charset=utf-8",
      'Authorization':"Bearer "+token?.value
      }
    })
    const rol = await res?.rol?.nombreRol || null
    if(rol!=='NORMAL'){
      return NextResponse.redirect(new URL('/', request.url))  
    }
    return NextResponse.next();
}
 
export const config = {
  matcher: ['/prueba','/estudiante/registrar_reserva']
}