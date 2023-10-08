'use client'
import { useEffect, useState } from 'react'
import styles from './Filtros.module.css'

const Filtros=({filtros,handleFiltrosValores})=>{

    const [filtrosVal,setFiltrosVal]=useState({})

    const handleChange=(e)=>{
        setFiltrosVal({...filtrosVal,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        handleFiltrosValores(filtrosVal)
    },[filtrosVal])

    return(
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Opción</th>
                    <th>Puntos</th>
                </tr>
            </thead>
            <tbody>
                {filtros !== null &&
                    filtros.map((el, i) => (
                        <tr key={"condiciones" + i}>
                            <td  name="condicion">
                                {el.name}
                            </td>
                            <td>
                                <select name={el.name.trim()}
                                        id={"filtrosAplicados"+i} 
                                        className={styles.select}
                                        onChange={(e)=>{handleChange(e)}}
                                        required>
                                    {
                                        <option value={null}>...seleccione uno</option>
                                    }
                                    {
                                        el?.values && el?.values.map((el,j)=><option key={'opt'+el+j} 
                                                                value={el}>{el}</option>)
                                    }
                                </select>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}
export default Filtros