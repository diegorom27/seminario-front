'use client'
import {get,post} from '@/helpers/helperHttp'
import server from '@/assets/server.js'
import Table from '@/components/global/Table'
import styles from './styles.module.css'
import { getCookie} from "@/helpers/clientCookies.js";
import {useEffect, useState } from 'react'
import {useRouter} from 'next/navigation'
const {protocol,domain,port} = server

const initialForm={
    'fecha':null
}
const url = `${protocol}://${domain}:${port}`;

function obtenerDiaSemana(numero) {

    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'];
    const nombreDia = dias[numero];
  
    return nombreDia;
  }

const ver_disponibilidad=(req)=>{
    const router = useRouter()
    const {id} = req.params
    const [form,setForm] = useState(initialForm)
    const [fechas,setFechas]=useState([])
    const [fechaActual,setFechaActual]=useState(null)
    useEffect(()=>{
        let fechaActual = new Date();

        let año = fechaActual.getFullYear();
        let mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        let dia = fechaActual.getDate().toString().padStart(2, '0');


        let fechaFormateada = año + '-' + mes + '-' + dia;
        setFechaActual(fechaFormateada)
    },[])

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:(e.target.type!=='checkbox')?e.target.value:e.target.checked
        })
    }
    
    const reservar=async(id,fecha,start,end,callback)=>{
        let token = getCookie(document, "token");
        post(`${url}/api/guardarRecurso/`,{
            headers: {
                'Content-Type': "application/json;charset=utf-8",
                'Authorization':"Bearer "+token
            },body:{
                "resourceId": id,
                "startTime": start,
                "endTime": end,
                "date": fecha,
                "observations": "Se presta el salon"
            },
            cache: "no-store"
        }).then((res)=>{
            callback(res)
        })
        router.reload()
    }

    const buscarDisponibilidad=async()=>{
        let token = getCookie(document, "token");
        if(form.fecha===null){
            alert('Debe seleccionar una fecha')
            return
        }
        if(new Date(fechaActual)>new Date(form.fecha)){
            alert('La fecha debe ser mayor a la actual')
            return
        }
        get(`${url}/api/listarRecursosPorIdYFecha/${id}/${form.fecha}`,{
            headers: {
                'Content-Type': "application/json;charset=utf-8",
                'Authorization':"Bearer "+token
            }
        }).then((res)=>{
            if(res.ok===false){
                setFechas([])
                return
            }
            setFechas(res.dateAvailabilities.map((el,i)=>[el.startTime,el.endTime,obtenerDiaSemana(el.day),
                el.isAvailable?<button key={'btnPres'+i} onClick={()=>reservar(id,form.fecha,el.startTime,el.endTime,console.log('hola'))}>Reservar</button>:'ocupada'
            ]))
        })
    } 
    return(
        <>
        <h2 className={styles.title}>Buscar Prestamos</h2>
        <div style={{'display':'flex',
                     'justifyContent':'center',
                     'flexWrap':'wrap'}}>
           <div className={styles.container}>
            <section className={styles.inputs + " " + styles.flexCol + " " +styles.boxShadow}>
                    <form style={{ display: "flex",
                                                flexDirection: "column",
                                                gap: "0.8rem",
                                            }}>
                        <div className={styles.flexRow}>
                            <label style={{flexGrow:"1"}}>
                                <input type="date" 
                                    name='fecha' 
                                    onChange={(e)=>handleChange(e)}
                                    required/>
                                    <span > Fecha</span>
                            </label>
                        </div>
                        <button type='submit'
                                className={styles.button+' '+'anim-btn'} 
                                onClick={(e)=>{ e.preventDefault()
                                                buscarDisponibilidad()}}>Buscar fechas</button>
                    </form>
                </section>
           </div>
            <Table columns={[
            'Nombre Recurso',
            'Fecha Reserva',
            'Fecha Entrega',
            'Actions']} data={fechas}/>
        </div>
        </>
    )
}
export default ver_disponibilidad