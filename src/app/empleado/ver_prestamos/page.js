'use client'
import {get,put} from '@/helpers/helperHttp'
import server from '@/assets/server.js'
import Table from '@/components/global/Table'
import styles from './styles.module.css'
import { getCookie} from "@/helpers/clientCookies.js";
import {useEffect, useState } from 'react'
const {protocol,domain,port} = server

const initialForm={
    'id':null
}
const url = `${protocol}://${domain}:${port}`;

const ver_prestamos=()=>{

    const [form,setForm] = useState(initialForm)
    const [prestamos,setPrestamo] = useState([])
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
    
    const devolverPrestamo=async(fechaEntrega,idReserva,callback)=>{
        let token = getCookie(document, "token");
        get(`${url}/prestamo/actualizarFechaDePrestamo/${idReserva}/${fechaEntrega}`,{
            headers: {
                'Content-Type': "application/json;charset=utf-8",
                'Authorization':"Bearer "+token
            }
        }).then((res)=>{
            callback()
        })
    }

    const handleBuscarPrestamos=async()=>{
        let token = getCookie(document, "token");
        get(`${url}/prestamo/listarPrestados/${form.id}`,{
            headers: {
                'Content-Type': "application/json;charset=utf-8",
                'Authorization':"Bearer "+token
            }
        }).then((res)=>{
            if(res.ok===false){
                setPrestamo([])
                return
            }
            setPrestamo(res.map((el,i)=>[el.reserva.recurso.nombreRecurso,el.reserva.fechaReserva,el.fechaEntrega,
                <button key={'btnPres'+i} onClick={()=>devolverPrestamo(fechaActual,el.reserva.idReserva,handleBuscarPrestamos)}>Devolver</button>
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
                                <input type="number" 
                                    name='id' 
                                    onChange={(e)=>handleChange(e)}
                                    required/>
                                    <span > Id</span>
                            </label>
                        </div>
                        <button type='submit'
                                className={styles.button+' '+'anim-btn'} 
                                onClick={(e)=>{ console.log('hola')
                                                e.preventDefault()
                                                handleBuscarPrestamos()}}>Buscar Prestamos</button>
                    </form>
                </section>
           </div>
            <Table columns={[
            'Nombre Recurso',
            'Fecha Reserva',
            'Fecha Entrega',
            'Actions']} data={prestamos}/>
        </div>
        </>
    )
}
export default ver_prestamos