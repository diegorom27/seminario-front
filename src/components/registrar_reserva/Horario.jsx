const { useState, useEffect } = require("react")

const Horario=({styles,handleChange,cronograma,i})=>{
    const [horario,setHorario]=useState({})
    const [dia,setDia]=useState(null)
    const handleHorario=(e)=>{
        if(e.target.name=='fecha')setDia(e.target.value)
        setHorario({...horario,[e.target.name]:e.target.value})
    }

    const handleOnBlur=(e)=>{
        if(e.target.type=='time' && e.target.value.split(':')[1]!='00'){
            e.target.value=e.target.value.split(':')[0].concat(':00')
            handleHorario(e)
        }
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
                        onChange={(e)=>handleHorario(e)}
                        required/>
                <span >F.  inicio convocatoria</span>
            </label> 
            <label>
                <input  type="time"
                        placeholder=''
                        name='horaInicio'
                        pattern=''
                        onChange={(e)=>handleHorario(e)}
                        onBlur={(e)=>handleOnBlur(e)}
                        required/>
                <span >Hora inicio</span>
            </label>
            <label>
                <input  type="time"
                        placeholder=''
                        name='horaFin'
                        onChange={(e)=>handleHorario(e)}
                        onBlur={(e)=>handleOnBlur(e)}
                        required/>
                <span >Hora Fin</span>
            </label>
        </div>
    )
}
export default Horario