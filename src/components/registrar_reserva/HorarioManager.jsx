import Horario from "@/components/registrar_reserva/Horario";
import { useEffect, useState } from "react";
/*agregar error*/
const diasDeLaSemana = ["","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado","Domingo"];

const HorarioManager=({styles,disponibilidad,handleCronograma,handleErrorCronograma,showNotificationMessage,errorCronograma})=>{

    const [horarios, setHorarios] = useState([]);
    const [diasDisponibles,setDiasDisponibles] =useState(``);

    useEffect(()=>{
        if(disponibilidad==null)return
        setDiasDisponibles(disponibilidad.reduce((acumulador, elemento, indice) => {
            return acumulador + `${elemento.dia}, de ${elemento.incio} a ${elemento.fin}${indice < disponibilidad.length - 1 ? '\n' : ''} `;
        }, ''));
    },[disponibilidad])
    
    const verifyDisponibilidad=(dia,ini,fin,i)=>{

        let diaString=diasDeLaSemana[new Date(dia).getUTCDay()]
        const fechaBase = new Date('1970-01-01');
        let diff = (new Date(fechaBase.toDateString() + ' ' + fin)-new Date( fechaBase.toDateString() + ' '+  ini))/3600000
        ini=ini
        fin=fin
        if(!disponibilidad.some((el=>el.dia==diaString && 
                                    el.incio<=ini+':00' &&
                                    el.fin>=fin+':00'))){
            handleErrorCronograma(`${i}D`)
            showNotificationMessage(false,`Los unicos dias posibles son:\n ${diasDisponibles}`)
        }else{
            handleErrorCronograma(`${i}D`,'del')
        }
        if(diff%disponibilidad[0].horaMin!=0){
            handleErrorCronograma(`${i}L`)
            showNotificationMessage(false,`El tiempo minimo es de: ${disponibilidad[0].horaMin}`)
        }else{
            handleErrorCronograma(`${i}L`,'del')
        }
        if(fin<=ini){
            handleErrorCronograma(`${i}M`)
            showNotificationMessage(false,`La fecha de inicio debe ser menor que la hora de Fin`)
        }else{
            handleErrorCronograma(`${i}M`,'del')
        }
    }
    
    const handleHorarios = (e) => {
        if (disponibilidad == null) return;
		e.preventDefault();
		setHorarios([
			...horarios,
			<Horario
                key={horarios.length + 1}
				handleChange={handleCronograma}
				styles={styles}
                verifyDisponibilidad={verifyDisponibilidad}
				i={horarios.length + 1}
                errorCronograma={errorCronograma}
			/>,
		]);
	};

    return(
        <>
            {horarios}
            <button type="button"
                onClick={(e) => handleHorarios(e)}
                className={styles.button}>
                Add date
            </button>
        </>
    )
}
export default HorarioManager