import { useState, useEffect } from "react";
import CustomSelect from "@/components/registrar_reserva/CustomSelect";
import { getCookie } from "@/helpers/clientCookies.js";
import { post, get } from "@/helpers/helperHttp";
import server from "@/assets/server";


const { protocol, domain, port } = server;
const url = `${protocol}://${domain}:${port}`;


const SelectManager=({styles,filtros,setFiltros,handleDisponibilidad,selectedTipoOption, setSelectedTipoOption})=>{

    const [tiposOptions, setTiposOptions] = useState([]);
    const [filtrosOptions, setFiltrosOptions] = useState([]);
	const [disabled, setDisabled] = useState(false);

    const [selectedFiltroOption, setSelectedFiltroOption] = useState(null);

    useEffect(() => {
		let token = getCookie(document, "token");
		get(url + "/tipo/listar/", {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: "Bearer " + token,
			},
		})
        .then((res) =>
            res.map((el) => ({
                id: el.idTipo,
                nombre: el.nombreTipo,
            }))
        )
        .then((tipos) => setTiposOptions(tipos));
	}, []);

    useEffect(() => {
		if (selectedTipoOption == null) return;
		let token = getCookie(document, "token");

        /*cargar filtros*/
		get(url + "/caracteristica/listarSegunIdTipo/" + selectedTipoOption, {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: "Bearer " + token,
			},
		})
        .then((res) =>
				res.map((el) => ({
					id: el.idCaracteristica,
					nombre: el.nombreCaracteristica,
				}))
		)
        .then((options) => {
				setDisabled(true);
				setFiltrosOptions(options);
		});
    }, [selectedTipoOption]);

    
	useEffect(() => {
        handleDisponibilidad(selectedTipoOption)
	}, [selectedTipoOption]);
    
	const handleChangeTipo = (e) => {
		setSelectedTipoOption(e.target.value);
	};

	const handleChangeFiltroDeseado = (e) => {
		setSelectedFiltroOption(e.target.value);
	};

    const handleFiltros = (e) => {
		e.preventDefault();
		if (selectedFiltroOption == null) return;

		let token = getCookie(document, "token");
		get(url + "/cumple/listarSegunIdCaracteristica/" + selectedFiltroOption, {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: "Bearer " + token,
			},
		})
        .then((res) => ({
            name: res.nombreCaracteristica,
            values: res.cumples.map((el) => ({
                id: el.valorCaracteristica,
                nombre: el.valorCaracteristica,
            })),
        }))
        .then((filter) => {
            //revisar que es lo que se esta enviando
            setFiltros({...filtros,[filter.name]:{
                name:filter.name,
                id:selectedFiltroOption,
                values:filter.values,
            }})
        });
	};


    return(
        <>
            <div className={styles.flexRow}>
                <CustomSelect styles={styles}
                              options={tiposOptions}
                              handleChange={handleChangeTipo}
                              text={"Tipos"}
                              disabled={disabled}/>
                <CustomSelect styles={styles}
                              options={filtrosOptions}
                              handleChange={handleChangeFiltroDeseado}
                              text={"Filtros deseados"}
                              disabled={false}/>
            </div>
            <button type="button"
                    onClick={(e)=>handleFiltros(e)}
                    className={styles.button}>
                Add filter
            </button>
        </>
    )
}
export default SelectManager