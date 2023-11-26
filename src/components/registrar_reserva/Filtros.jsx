'use client'
import styles from '@/assets/Filtros.module.css'

const Filtros=({filtros,handleFiltrosValores})=>{
    return(
        <section className={styles.section}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Filtro</th>
                        <th>Opción</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(filtros) !== null &&
                        Object.values(filtros).map((el, i) => (
                            <tr key={"condiciones" + i}>
                                <td  name="condicion">
                                    {el.name}
                                </td>
                                <td >
                                    <select name={el?.id}
                                            id={"filtrosAplicados"+i} 
                                            className={styles.select}
                                            onChange={(e)=>{handleFiltrosValores(e)}}
                                            required>
                                        {
                                            <option value={null}>...seleccione uno</option>
                                        }
                                        {
                                            el?.values && el?.values.map((el,j)=><option key={'opt'+el+j} 
                                                                    value={el.id}>{el.nombre}</option>)
                                        }
                                    </select>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </section>
    )
}
export default Filtros