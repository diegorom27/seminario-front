import Row from './Row.jsx' 
import styles from '@/assets/Tabla.module.css'
const Table=({columns,data})=>{
    return(
        <>
            <div className={styles.container }>
                <table className={styles.table+' '+styles.boxShadow}>
                    <thead>
                        <tr>
                            {
                                columns.map((el,i)=>
                                    <th key={'th'+i} >{el}</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                        (data!=null)?data.length>0?
                            data.map((el,i)=>
                            <Row key={'row'+i}
                                registro={el}/>
                            ):
                            <tr>
                                <td colSpan={4}>No hay datos disponibles</td> 
                            </tr>:
                            <tr>
                                <td colSpan={4}>Ha ocurrido un error</td> 
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Table