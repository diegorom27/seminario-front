const { useState, useEffect } = require("react")

const Horario=({styles,handleChange,cronograma,i})=>{
    const [horario,setHorario]=useState({})
    const [dia,setDia]=useState(null)
    const handleHorario=()=>{
        if(e.target.name=='fecha')setDia(e.target.value)
        setHorario({...horario,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        if(dia==null)return
        handleChange(cronograma,dia,horario)
    },[horario])

    return(
        <div className={styles.flexRow}>
            <label>
                <input  type="date"
                        placeholder=''
                        name='fecha'
                        onChange={handleHorario}
                        required/>
                <span >F.  inicio convocatoria</span>
            </label> 
            <label>
                <input  type="time"
                        placeholder=''
                        name='horaInicio'
                        pattern=''
                        onChange={handleHorario}
                        required/>
                <span >Hora inicio</span>
            </label>
            <label>
                <input  type="time"
                        placeholder=''
                        name='horaFin'
                        onChange={handleHorario}
                        required/>
                <span >Hora Fin</span>
            </label>
        </div>
    )
}
export default Horario