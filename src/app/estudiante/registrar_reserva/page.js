'use client'
import { useEffect, useState } from 'react'
import {post,get} from '../../../helpers/helperHttp'
import styles from './styles.module.css'
import server from '@/assets/server'
import CustomSelect from '@/components/registrar_reserva/CustomSelect'
import Horario from '@/components/registrar_reserva/Horario'
import Filtros from '@/components/registrar_reserva/Filtros'

const {protocol,domain,port} = server

const tiposProvisional = ['salon','cancha','auditorio']

const filtrosProvisionales = ['aforo', 'proyector','televisores','sillas']

const RegistrarReserva=()=>{
    /* select filtros*/
    const [selectedTipoOption,setSelectedTipoOption]=useState(null)
    const [tiposOptions,setTiposOptions]= useState([])
    const [selectedFiltroOption,setSelectedFiltroOption]=useState(null)
    const [filtrosOptions,setFiltrosOptions]=useState([])

    useEffect(()=>{
        /*fetch tipos*/
        setTiposOptions(tiposProvisional)
    },[])
    useEffect(()=>{
        if(selectedTipoOption==null)return
        console.log('hola')
        /*fetch opciones de Filtros*/
        setFiltrosOptions(filtrosProvisionales)
    },[selectedTipoOption])

    const handleChangeTipo=(e)=>{
        setSelectedTipoOption(e.target.value)
    }

    const handleChangeFiltroDeseado=(e)=>{
        setSelectedFiltroOption(e.target.value)
    }


    /*dates*/
    const [cronograma,setCronograma]=useState({})
    const [horarios,setHorarios]=useState([])

    const handleCronograma=(cronograma,dia,horario)=>{
        setCronograma({...cronograma,[dia]:horario})
    }
    const handleHorarios=(e)=>{
        e.preventDefault()
        setHorarios([...horarios,<Horario handleChange={handleCronograma} 
                                          cronograma={cronograma}
                                          styles={styles} 
                                          i={horarios.length+1}/>])
    }

    /*filtros*/

    const [filtros,setFiltros] = useState([])

    const handleFiltros=(e)=>{
        e.preventDefault()
        if(selectedFiltroOption==null)return 

        /*fetch valores filtro*/

        setFiltros([...filtros,{name:selectedFiltroOption,
                                values:['hola','ohla','aloh','halo']}])
    }



    
    return(
        <div className={styles.container}>
            <h2 className={styles.title}>Realizar reserva</h2>
            <div className={styles.form +' '+ styles.boxShadow }>
                {/*Add filter y Tipo de recurso*/}
                <section className={styles.inputs+' '+styles.flexCol}>
                    <div className={styles.flexRow}>
                        <CustomSelect styles={styles}
                                      options={tiposOptions}
                                      handleChange={handleChangeTipo}
                                      text={'Tipos'}/>
                        <CustomSelect styles={styles}
                                      options={filtrosOptions}
                                      handleChange={handleChangeFiltroDeseado}
                                      text={'Filtros deseados'}/>
                    </div>
                    <button type='button' 
                            onClick={(e)=>handleFiltros(e)}
                            className={styles.button}>Add filter</button>
                    <form style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'0.8rem'
                    }}>
                        {/*Fechas*/}
                        <Horario handleChange={handleCronograma} 
                                cronograma={cronograma}
                                styles={styles} 
                                i={0}/>
                        {horarios}
                        <button type='button' 
                                onClick={(e)=>handleHorarios(e)} 
                                className={styles.button}>Add date</button>   
                        <section className={styles.section}>
                            {
                                <Filtros filtros={filtros}/>
                            }
                        </section>
                        <button type='submit' 
                                onClick={(e)=>handleSubmit(e)}
                                className={styles.button}>Bucar Recursos</button>
                    </form>
                </section>
            </div> 
        </div>
    )
}
export default RegistrarReserva