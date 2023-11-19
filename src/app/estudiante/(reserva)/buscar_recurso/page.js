"use client";
import {useState } from "react";
import {get } from "../../../../helpers/helperHttp";
import { getCookie, setCookie } from "../../../../helpers/clientCookies.js";
import styles from "./styles.module.css";
import server from "@/assets/server";
import SelectManager from "@/components/registrar_reserva/SelectManager";
import Filtros from "@/components/registrar_reserva/Filtros";
import Notification from "@/components/global/Notificaction";
import HorarioManager from "@/components/registrar_reserva/HorarioManager";
import {useRouter} from "next/navigation";

const { protocol, domain, port } = server;
const url = `${protocol}://${domain}:${port}`;

const RegistrarReserva = () => {

    const [selectedTipoOption, setSelectedTipoOption] = useState(null);

    /*filtros*/
	const [filtros, setFiltros] = useState({});
	const [filtrosVal, setFiltrosVal] = useState({});

    const [disponibilidad,setDisponibilidad]=useState(null)

    const handleFiltrosValores = (e) => {
		setFiltrosVal({...filtrosVal,[e.target.name]:e.target.value})
	};
    
    const handleDisponibilidad=(selectedTipoOption)=>{
        if (selectedTipoOption == null) return;
        let token = getCookie(document, "token");
        get(url + "/diponibilidad/listarSegunIdTipo/" + selectedTipoOption, {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: "Bearer " + token,
			},
		})
        .then((res) =>{
            return res.map((el) => ({
                dia: el.diaDisponibilidad,
                incio: el.horaInicio,
                fin: el.horaFin,
                horaMin:el.horaMin
            }))
        })
        .then((disp) => {
            setDisponibilidad(disp)
		});

    }


	/*dates*/

    const [cronograma, setCronograma] = useState([]);

    const [openNotificacion,setOpenNotificacion]=useState(false)
    const [notificacionMessage,setNotificacionMessage]=useState('false')
    const [notificacionError,setNotificacionError]=useState('false')
    const [errorCronograma,setErrorCronograma]=useState({})

    const handleCronograma = (dia, horario) => {
		setCronograma({ ...cronograma, [dia]: horario });
	};
    const handleErrorCronograma=(error,flag)=>{
        if(flag!=='del'){  
            setErrorCronograma({...errorCronograma,[error]:error})  
        }else{
            setErrorCronograma((prev)=>{
                let errors=JSON.parse(JSON.stringify(prev))
                delete errors[error]
                return errors
            })
        }    
    }
    /*notificaciones*/
    const showNotificationMessage=(isError,message)=>{
        setNotificacionError(isError)
        setOpenNotificacion(Math.random())
        setNotificacionMessage(message)            
    }
    
    /* envio (paso a la siguiente vista de realizar reserva) */    
    const router = useRouter()
	
	const handleSubmit = (e) => {
		e.preventDefault();
        if(Object.keys(errorCronograma).length>0){
            showNotificationMessage(false,'Por favor revise las fechas')
            return
        }
        if(cronograma.length==0){
            showNotificationMessage(false,'Es necesario agregar fechas para reservar')
            return
        }
        let caracteristicas= Object.keys(filtrosVal).map((el)=>{
            return {
                'idCaracteristica':el,
                'valorCaracteristica':filtrosVal[el]
            }
        })
        setCookie(document,'bodyFiltrar',JSON.stringify({
            'tipo':selectedTipoOption,
            'cronograma':Object.values(cronograma),
            'cumple':caracteristicas
        }),{'max-age': 3600})
        
        router.push('/estudiante/reservar_recurso?query='+JSON.stringify({
    	        'tipo':selectedTipoOption,
                'cronograma':Object.values(cronograma),
                'cumple':caracteristicas
            })
        )
	};

	return (
        <>
            <div className={styles.container}>
                <h2 className={styles.title}>Buscar Recursos</h2>
                <div className={styles.form + " " + styles.boxShadow}>
                    {/*Add filter y Tipo de recurso*/}
                    <section className={styles.inputs + " " + styles.flexCol}>
                        <SelectManager styles={styles} 
                                       filtros={filtros}
                                       setFiltros={setFiltros}
                                       handleDisponibilidad={handleDisponibilidad}
                                       selectedTipoOption={selectedTipoOption}
                                       setSelectedTipoOption={setSelectedTipoOption}/>
                        <form style={{ display: "flex",
                                        flexDirection: "column",
                                        gap: "0.8rem",
                                    }}>
                            {/*Fechas*/}
                            <HorarioManager styles={styles}
                                            disponibilidad={disponibilidad}
                                            handleCronograma={handleCronograma}
                                            cronograma={cronograma}
                                            handleErrorCronograma={handleErrorCronograma}
                                            showNotificationMessage={showNotificationMessage}
                                            errorCronograma={errorCronograma}/>
                            <Filtros filtros={filtros}
                                     handleFiltrosValores={handleFiltrosValores}/>
                            <button type="submit"
                                    onClick={(e) => handleSubmit(e)}
                                    className={styles.button+' '+'anim-btn'}>
                                Bucar Recursos
                            </button>
                        </form>
                    </section>
                </div>
            </div>
            {/* Error Horario */}
            {
            <Notification message={notificacionMessage} 
                          sucess={notificacionError} 
                          open={openNotificacion}/>
            }
        </>
	);
};
export default RegistrarReserva;
