'use client'
import { useEffect, useState } from "react"
import Card from "@/components/global/Card"
import styles from "./styles.module.css";
import Image from 'next/image'
import server from '@/assets/server.js'
import { useRouter } from "next/navigation";
import { getCookie } from "@/helpers/clientCookies";
import { post } from '@/helpers/helperHttp'
const ReservarRecurso=()=>{
    const {protocol,domain,port} = server
    const url = `${protocol}://${domain}:${port}`
    const router = useRouter()
    

    const [recursos,setRecursos]= useState([
        {
            "idRecurso": 1,
            "descripcionRecurso": "Salon 401C.",
            "nombreRecurso": "Salon 1",
            "tipo": {
                "idTipo": 4,
                "nombreTipo": "Salón",
                "tiempoMin": 2
            }
        },{
            "idRecurso": 1,
            "descripcionRecurso": "Salon 401C.",
            "nombreRecurso": "Salon 1",
            "tipo": {
                "idTipo": 4,
                "nombreTipo": "Salón",
                "tiempoMin": 2
            }
        },{
            "idRecurso": 1,
            "descripcionRecurso": "Salon 401C.",
            "nombreRecurso": "Salon 1",
            "tipo": {
                "idTipo": 4,
                "nombreTipo": "Salón",
                "tiempoMin": 2
            }
        }
        ,{
            "idRecurso": 1,
            "descripcionRecurso": "Salon 401C.",
            "nombreRecurso": "Salon 1",
            "tipo": {
                "idTipo": 4,
                "nombreTipo": "Salón",
                "tiempoMin": 2
            }
        },{
            "idRecurso": 1,
            "descripcionRecurso": "Salon 401C.",
            "nombreRecurso": "Salon 1",
            "tipo": {
                "idTipo": 4,
                "nombreTipo": "Salón",
                "tiempoMin": 2
            }
        },,{
            "idRecurso": 1,
            "descripcionRecurso": "Salon 401C.",
            "nombreRecurso": "Salon 1",
            "tipo": {
                "idTipo": 4,
                "nombreTipo": "Salón",
                "tiempoMin": 2
            }
        },{
            "idRecurso": 1,
            "descripcionRecurso": "Salon 401C.",
            "nombreRecurso": "Salon 1",
            "tipo": {
                "idTipo": 4,
                "nombreTipo": "Salón",
                "tiempoMin": 2
            }
        }
        ,{
            "idRecurso": 1,
            "descripcionRecurso": "Salon 401C.llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll",
            "nombreRecurso": "Salon 1",
            "tipo": {
                "idTipo": 4,
                "nombreTipo": "Salón",
                "tiempoMin": 2
            }
        },{
            "idRecurso": 1,
            "descripcionRecurso": "Salon 401C.",
            "nombreRecurso": "Salon 1",
            "tipo": {
                "idTipo": 4,
                "nombreTipo": "Salón",
                "tiempoMin": 2
            }
        },
    ])
    /*
    useEffect(()=>{
        let body = getCookie(document,'bodyFiltrar')
        let token = getCookie(document,'token')
        console.log(body)
        post(url+'/'+'recurso/filtrar/',{
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + token,
            },
            body:JSON.parse(body)
		})
        .then((res)=>{
            console.log(res)
            //setRecursos(res)
        })
    },[recursos])
    */
    return(
        <div className={styles.cardsContainer+" "+styles.dinamycGrid}>
            {
                recursos.map((el,i)=>
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
                                <button className={styles.buttonReserva+' '+'anim-btn'}>Reservar</button> 
                            </div>
                          }
                    
                    />
                )
            }
        </div>
    )
}
export default ReservarRecurso