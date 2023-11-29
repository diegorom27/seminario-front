import {get} from '@/helpers/helperHttp'
import server from '@/assets/server.js'
import { cookies } from 'next/headers'
import Table from '@/components/global/Table'
import Link from 'next/link'
const {protocol,domain,port} = server

const fetchRecursos =async()=>{
    const cookieStore = cookies()
    let token = cookieStore.get('token');
    
    return get(`${protocol}://${domain}:${port}/api/listarRecursos/`,{
        headers: {
            'Content-Type': "application/json;charset=utf-8",
            'Authorization':"Bearer "+token.value
            }
    }).then((res)=>res.map((el)=>[el.name,el.type,el.description,el.details, <button><Link href={"/estudiante/extra/ver_disponibilidad/"+el.id}>ver disponibilidad</Link></button>]))
}
const ver_reservas=async()=>{

    return(
        <>
            {
                await fetchRecursos()
                .then((el)=>
                    <Table columns={['Nombre',
                    'Tipo',
                    'Descripción',
                    'Detalles',
                    'Disponibilidad']} data={el}/>
                )
            }
        </>
    )
}
export default ver_reservas
