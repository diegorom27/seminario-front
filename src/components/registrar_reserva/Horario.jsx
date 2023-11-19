const { useState, useEffect } = require("react")

/*agregar error*/

const Horario=({styles,handleChange,verifyDisponibilidad,i,errorCronograma})=>{
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
        if(dia!=null && horario?.horaInicio && horario?.horaFin){
            verifyDisponibilidad(dia,horario.horaInicio,horario.horaFin,i)
        }
    }

    useEffect(()=>{
        if(dia==null || horario?.horaInicio==undefined || horario?.horaFin==undefined)return
        handleChange(dia,horario)
    },[horario])
    return(
        <div className={styles.flexRow}>
            <label style={{flexGrow:"1"}}>
                <input  type="date"
                        placeholder=''
                        name='fecha'
                        onChange={(e)=>handleHorario(e)}
                        onBlur={(e)=>handleOnBlur(e)}
                        className={Object.hasOwn(errorCronograma,i+'D')?'warning':''}
                        required/>
                <span >F.  inicio convocatoria</span>
            </label> 
            <label style={{flexShrink:"1"}}>
                <input  type="time"
                        placeholder=''
                        name='horaInicio'
                        pattern=''
                        onChange={(e)=>handleHorario(e)}
                        onBlur={(e)=>handleOnBlur(e)}
                        required/>
                <span >Hora inicio</span>
            </label>
            <label style={{flexShrink:"1"}}>
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