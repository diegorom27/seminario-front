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
                    disabled={disabled}
                    readonly>
                {
                    <option value={null}>...seleccione uno</option>
                }
                {
                    options.map((el,i)=><option key={'opt'+k+i} 
                                            value={el}>{el}</option>)
                }
            </select>
        </div>
    )
}
export default CustomSelect