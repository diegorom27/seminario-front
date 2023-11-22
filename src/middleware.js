import { NextResponse } from 'next/server'
import server from './assets/server' 
import { get } from './helpers/helperHttp'

const {protocol,domain,port}= server
const url = `${protocol}://${domain}:${port}`

export async function middleware(request) {
  let token = request.cookies.get('token')
  let rol = ""

  if(request.cookies.has('rol')){
    rol = request.cookies.get('rol').value
  }else{
    const res = await get(`${url}/token/actual-usuario/`,{
      headers: {
      'Content-Type': "application/json;charset=utf-8",
      'Authorization':"Bearer "+token?.value
      }
    })
    rol = await res?.rol?.nombreRol || ''
  }
  if(request.nextUrl.href.includes('estudiante') && rol!=='NORMAL'){
      return NextResponse.redirect(new URL('/', request.url))  
  }else if(request.nextUrl.href.includes('empleado') && rol!=='ADMIN'){
      return NextResponse.redirect(new URL('/', request.url)) 
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/estudiante/:path*','/empleado/:path*']
}