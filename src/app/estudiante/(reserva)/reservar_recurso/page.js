'use client'
import { useEffect, useState } from "react"
import Card from "@/components/global/Card"
import Notification from "@/components/global/Notificaction";
import styles from "./styles.module.css";
import Image from 'next/image'
import server from '@/assets/server.js'
import { useSearchParams , useRouter } from "next/navigation";
import { getCookie } from "@/helpers/clientCookies";
import { post } from '@/helpers/helperHttp'

const ReservarRecurso=()=>{
    const {protocol,domain,port} = server
    const url = `${protocol}://${domain}:${port}`
    const router = useRouter()
    
    const searchParams = useSearchParams()
    const search = JSON.parse(searchParams.get('query'))

    const [recursos,setRecursos]= useState([])
    const [openNotificacion,setOpenNotificacion]=useState(false)
    const [notificacionMessage,setNotificacionMessage]=useState('false')
    const [notificacionError,setNotificacionError]=useState('false')

    useEffect(()=>{
        let token = getCookie(document,'token')
        post(url+'/'+'recurso/filtrar/',{
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + token,
            },
            body:search
		})
        .then((res)=>{
            setRecursos(res)
        })
    },[])

    const sendData=(idRecurso)=>{
        let token = getCookie(document,'token')
        let reserva={
            "reserva": {
                "estado": "En proceso",
                "recurso": {
                    idRecurso
                }
            },
            "cronograma": search.cronograma
        }
        post(url+'/'+'reserva/guardar/',{
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + token,
            },
            body:reserva
		}).then((res)=>{
            setNotificacionError(true)
            setOpenNotificacion(Math.random())
            setNotificacionMessage("Buena mi bro")     
            setTimeout(()=>router.push('/estudiante/inicio',0))
        })
    }
    return(
        <>
            <div className={styles.cardsContainer+" "+styles.dinamycGrid}>
            {
                recursos.length>0?recursos.map((el,i)=>
                    <Card key={'cardRecurso'+i}
                          front={
                            <div className={styles.cardInfo}>
                                <Image src="https://laud.udistrital.edu.co/sites/default/files/imagen-noticia/2022-09/LAUD%20Maestr%C3%ADa%20en%20Investigaci%C3%B3n%20Social_0.png"
                                       width={500}
                                       height={800}
                                       className={styles.cardImage}
                                       alt="logoDistrital"/>
                                <div className={styles.info}>
                                    <h3 className={styles.recursoNombre}>{el.nombreRecurso}</h3>
                                    <h4 className={styles.recursoTipo}>Tipo: {el.tipo.nombreTipo}</h4>
                                    <p className={styles.recursoDesc}>Descripción: {el.descripcionRecurso}</p>
                                </div>
                            </div>
                          }
                          back={
                            <div className={styles.buttonSide}>
                                <button className={styles.buttonReserva+' '+'anim-btn'} onClick={(e)=>sendData(el.idRecurso)}>Reservar</button> 
                            </div>
                          }
                    
                    />
                ):<h3 className={styles.message}>No se encontraron recursos disponibles con las caracteristicas solicitadas 🤕.</h3>
            }
            </div>
            <Notification message={notificacionMessage} 
                          sucess={notificacionError} 
                          open={openNotificacion}/>
        </>
        )
}
export default ReservarRecurso