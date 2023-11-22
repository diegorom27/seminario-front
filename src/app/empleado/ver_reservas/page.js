'use client'
import {get,post} from '@/helpers/helperHttp'
import server from '@/assets/server.js'
import Table from '@/components/global/Table'
import styles from './styles.module.css'
import { getCookie, setCookie } from "@/helpers/clientCookies.js";
import {useEffect, useState } from 'react'
const {protocol,domain,port} = server

const initialForm={
    'fechaIni':null,
    'fechaFin':null,
    'estado':null,
    'id':null
}
const url = `${protocol}://${domain}:${port}`;

const ver_reservas=()=>{

    const [form,setForm] = useState(initialForm)
    const [reservas,setReservas] = useState([])
    const [fechaActual,setFechaActual]=useState(null)

    useEffect(()=>{
        let fechaActual = new Date();

        let año = fechaActual.getFullYear();
        let mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
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
    
    const guardarPrestamo=async(fechaEntrega,idReserva,fechaReserva,callback)=>{

        if(!(new Date(fechaReserva)==new Date(fechaEntrega))){
            alert('Solo es posible entregar los articulos en el dia y horario reservado')
            return
        }
        let token = getCookie(document, "token");
        post(`${url}/prestamo/guardar/`,{
            headers: {
                'Content-Type': "application/json;charset=utf-8",
                'Authorization':"Bearer "+token
            },
            body:{
                "fechaEntrega": fechaEntrega,
                "fechaDevolucion": null, 
                "idReserva" : idReserva
            }
        }).then((res)=>{
            console.log(res)
            callback()
        })
    }

    const handleBuscarReservas=async()=>{
        let token = getCookie(document, "token");
        get(`${url}/reserva/listarPorIdUsuarioSegunEstadoYRangoDeFechas/${form.id}/${form.estado}/${form.fechaIni}/${form.fechaFin}`,{
            headers: {
                'Content-Type': "application/json;charset=utf-8",
                'Authorization':"Bearer "+token
                }
        }).then((res)=>{
            console.log(res)
            if(res.ok===false){
                setPrestamo([])
                return
            }
            setReservas(res.map((el,i)=>[el.estado,el.fechaReserva,el.horaInicio,el.horaFin,el.recurso.nombreRecurso,
                el.estado=='proceso'?<button key={'btnPres'+i} onClick={()=>guardarPrestamo(fechaActual,el.idReserva,el.fechaReserva,handleBuscarReservas)}>Prestar</button>:'no actions'
        ]))
        })
    } 

    return(
        <>
        <h2 className={styles.title}>Buscar Reservas</h2>
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
                            <input  type="date"
                                    placeholder=''
                                    name='fechaIni'
                                    onChange={(e)=>handleChange(e)}
                                    required/>
                                <span >Fecha inicio</span>
                            </label> 
                            <label style={{flexGrow:"1"}}>
                            <input  type="date"
                                    placeholder=''
                                    name='fechaFin'
                                    onChange={(e)=>handleChange(e)}
                                    required/>
                                <span >Fecha fin</span>
                            </label>
                        </div>
                        <div className={styles.flexRow}>
                            <label style={{flexGrow:"1"}}>
                                <input type="number" 
                                    name='id' 
                                    onChange={(e)=>handleChange(e)}
                                    required/>
                                    <span > Id</span>
                            </label>
                            <select name={'estado'}
                                            id={"filtrosAplicados"} 
                                            className={styles.select}
                                            onChange={(e)=>{handleChange(e)}}
                                            required>
                                            <option value={null}>...seleccione uno</option>
                                            <option value={'proceso'}>proceso</option>
                                            <option value={'prestado'}>prestado</option>
                                            <option value={'devuelto'}>devuelto</option>
                            </select>
                        </div>
                        <button type='submit'
                                className={styles.button+' '+'anim-btn'} 
                                onClick={(e)=>{
                                    e.preventDefault()
                                    handleBuscarReservas()
                                }}>Buscar reserva</button>
                    </form>
                </section>
           </div>
            
            <Table columns={['Estado',
            'Fecha Reserva',
            'Hora Inicio',
            'Hora Fin',
            'Nombre Recurso',
            'Actions']} data={reservas}/>
        </div>
        </>
    )
}
export default ver_reservas