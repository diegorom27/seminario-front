'use client'

const CustomSelect=({styles,options,handleChange,text,disabled})=>{
    const k = text.trim()
    return(
        <div className={styles.select}>
            <label htmlFor={"filtros"+k}>
                <small>{text}</small>
            </label>
            <select name={"filtros"+k}
                    id={"filtros"+k} 
                    className={styles.select}
                    onChange={(e)=>handleChange(e)}
                    disabled={disabled}>
                {
                    <option value={null}>...seleccione uno</option>
                }
                {
                    options.map((el,i)=><option key={'opt'+k+i} 
                                            value={el.id}>{el.nombre}</option>)
                }
            </select>
        </div>
    )
}
export default CustomSelect