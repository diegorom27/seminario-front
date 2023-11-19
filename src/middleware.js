import { NextResponse } from 'next/server'
import server from './assets/server' 
import { get } from './helpers/helperHttp'
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
    //falta logica para acceso a los demas tipos de usuario
    const rol = await res?.rol?.nombreRol || null
    if((rol || '').trim().toUpperCase()!=='NORMAL'){
      return NextResponse.redirect(new URL('/', request.url))  
    }
    return NextResponse.next();
}
 
export const config = {
  matcher: ['/estudiante/inicio','/estudiante/buscar_recurso','/estudiante/reservar_recurso']
}