import {get} from '@/helpers/helperHttp'
import server from '@/assets/server.js'
import { cookies } from 'next/headers'
import Table from '@/components/global/Table'
const {protocol,domain,port} = server

const fetchReservas =()=>{
    const cookieStore = cookies()
    let id = cookieStore.get('idUsuario');
    let token = cookieStore.get('token');
    
    return get(`${protocol}://${domain}:${port}/reserva/listarPorIdUsuario/${id.value}`,{
        headers: {
            'Content-Type': "application/json;charset=utf-8",
            'Authorization':"Bearer "+token.value
            }
    }).then((res)=>res.map((el)=>[el.estado,el.fechaReserva,el.horaInicio,el.horaFin,el.recurso.nombreRecurso]))
}
const ver_reservas=async()=>{

    return(
        <>
            {
                await fetchReservas()
                .then((el)=>
                    <Table columns={['Estado',
                    'Fecha Reserva',
                    'Hora Inicio',
                    'Hora Fin',
                    'Nombre Recurso']} data={el}/>
                )
            }
        </>
    )
}
export default ver_reservas
