const { useState } = require("react")

const useForm=(initialForm,constraints,submit,callback)=>{
    const [form,setForm]=useState(initialForm)
    const [errors,setErrors]=useState(null)
    const [message,setMessage]=useState(null)
    const [success,setSuccess]=useState(null)

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
                if (Object.prototype.hasOwnProperty.call(res, "error")) {
                    setSuccess(false,res);
                    setMessage('Ha ocurrido un error')
                    callback(false,res)
                } else {
                    if (Object.prototype.hasOwnProperty.call(res, 'ok')) {
                        setSuccess(res.ok);
                        if(res.ok){
                            setMessage('Operación exitosa');
                            callback(true,res)
                        }
                        if(!res.ok){
                            setMessage('Ha ocurrido un error');
                            callback(false,res)
                        }
                    } else {
                        setSuccess(true);
                        callback(true,res)
                        setMessage('Operación exitosa');
                    }
                }
                return res
            }).catch((res)=>{
                setSuccess(false)
                console.log(res)
                return res
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