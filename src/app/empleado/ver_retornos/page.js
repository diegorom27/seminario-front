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

const ver_retornos=()=>{

    const [form,setForm] = useState(initialForm)
    const [retornos,setRetornos] = useState([])

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:(e.target.type!=='checkbox')?e.target.value:e.target.checked
        })
    }

    const handleBuscarRetornos=async()=>{
        let token = getCookie(document, "token");
        get(`${url}/prestamo/listarDevueltos/${form.id}`,{
            headers: {
                'Content-Type': "application/json;charset=utf-8",
                'Authorization':"Bearer "+token
            }
        }).then((res)=>{
            console.log(res)
            if(res.ok===false){
                setRetornos([])
                return
            }
            setRetornos(res.map((el)=>[el.reserva.recurso.nombreRecurso,el.reserva.fechaReserva,el.fechaEntrega,el.fechaDevolucion]))
        })
    } 

    return(
        <>
        <h2 className={styles.title}>Buscar Devueltos</h2>
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
                                onClick={(e)=>{ e.preventDefault()
                                                handleBuscarRetornos()}}>Buscar Prestamos</button>
                    </form>
                </section>
           </div>
            <Table columns={[
            'Nombre Recurso',
            'Fecha Reserva',
            'Fecha Entrega',
            'Fecha Devolución']} data={retornos}/>
        </div>
        </>
    )
}
export default ver_retornos