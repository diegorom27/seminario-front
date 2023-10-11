const { useState } = require("react")

const useForm=(initialForm,constraints,submit,callback)=>{
    const [form,setForm]=useState(initialForm)
    const [errors,setErrors]=useState(null)
    const [message,setMessage]=useState(null)
    const [success,setSucess]=useState(null)

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:(e.target.type!=='checkbox')?e.target.value:e.target.checked
        })
    }
    const handleBlur=(e)=>{
        setErrors(constraints(form))
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        setErrors(constraints(form))
        if(Object.entries(errors).length!==0)return null
        submit(form)
            .then(res=>{
                setMessage(res.message || 'Operación exitosa')
                setSucess(res?.error?false:true)
                return res
            })
            .then((res)=>{
                callback(res?.error?true:false,res)
            })
    }
    return{
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        message,
        success
    }
}
export default useForm