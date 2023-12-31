'use client'
import { post } from '../../helpers/helperHttp'
import styles from './page.module.css'
import useForm from '../../components/CustomHooks/useForm'
import server from '../../assets/server.js'
import { useModal } from '../../components/CustomHooks/useModal'
import ModalPortal from '../../components/global/Modal'
import { useRouter } from 'next/navigation'
const {protocol,domain,port} = server

const initialForm={
    correo:'',
    nombre:'',
    password:'',
    password2:'',
    esGuapo:false
}
const constraints=({correo,password,password2,esGuapo,nombre})=>{
    let error={}

    if(!/^[a-z0-9_\-\.]+@[a-z1-9_\-\.]+[^-_\.]\.[a-z]+$/gi.test(correo.trim())){
        error['correo']='El correo suministrado no es valido.'
    }else{
        delete error['correo']
    }
    if(!/^[a-zñáéíóúü\s]{4,25}$/gi.test(nombre.trim())){
        error['nombre']='Por favor dirijase a la registraduria.'
    }else{
        delete error['nombre']
    }
    if(!/^[a-z0-9_\-\.]+@[a-z1-9_\-\.]+[^-_\.]\.[a-z]+$/gi.test(correo.trim())){
        error['correo']='El correo suministrado no es valido.'
    }else{
        delete error['correo']
    }
    if(!/^[0-9a-zñáéíóúü_\s]{1,12}$/i.test(password.trim())){
        error['password']='La contraseña no cumple los estandares.'
    }else{
        delete error['password']
    }
    if(password!==password2){
        error['password2']='Ambas contraseñas deben ser iguales.'
    }else{
        delete error['password2']
    }
    if(esGuapo===false){
        error['esGuapo']='No nos mientas hermos@.'
    }else{
        delete error['esGuapo']
    }
    return error
}

const submit=async({correo,password,esGuapo,nombre})=>{
    return post(`${protocol}://${domain}:${port}/usuario/guardar/`,{
        body:{
            'username':correo,
            'password':password,
            'esGuapo':esGuapo,
            'nombres':nombre
        },
        isFormData:false,
        headers: {
            'Accept': "application/json, text/plain, */*",
            'Content-Type': "application/json;charset=utf-8"
        }
    })
} 

const FormularioRegistro=()=>{
    
    const router=useRouter()
    
    const {
        isOpen,
        closeModal,
        openModal
    }=useModal(false)

    const {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        message,
        success
    } = useForm(initialForm,constraints,submit,(success)=>{
        openModal()
        success && setTimeout(()=>{
            router.push('/')
        },500)
    }) 
    
    const dispayAgain=(e)=>{
        if(errors?.[e.target.name]){
            document.querySelector(`small[name=${e.target.name}]`).style.display='inline-block'
        }else{
            return null
        }
    }
    const handleFocus=(e)=>{
        if(errors?.[e.target.name]){
            document.querySelector(`small[name=${e.target.name}]`).style.display='none'
        }else{
            return null
        }
    }
    return(
        <div className={styles.container}>
            <form className={styles.form+' '+styles.boxShadow}>
                <div className={styles.title+' '+styles.flexCol+' '+styles.boxShadow}>
                    <h4>Hello my Doggie - Sign up</h4>
                </div> 
                <div className={styles.inputs+' '+styles.flexCol}>
                    <label>
                        <input name="correo" 
                            placeholder="" 
                            type='text'
                            onChange={(e)=>handleChange(e)}
                            onBlur={(e)=>{handleBlur(e)
                                          dispayAgain(e)}}
                            className={errors?.correo?'warning':''}
                            onFocus={(e)=>handleFocus(e)}/>
                        <span>Correo</span>
                    </label>
                    {errors?.correo && <small name='correo' className={styles.error}>{errors.correo}</small>}
                    <label>
                        <input name="nombre" 
                            placeholder="" 
                            type='text'
                            onChange={(e)=>handleChange(e)}
                            onBlur={(e)=>{handleBlur(e)
                                          dispayAgain(e)}}
                            className={errors?.correo?'warning':''}
                            onFocus={(e)=>handleFocus(e)}/>
                        <span>Nombre</span>
                    </label>
                    {errors?.nombre && <small name='nombre' className={styles.error}>{errors.nombre}</small>}
                    <label>
                        <input name="password" 
                            placeholder="" 
                            onChange={(e)=>handleChange(e)}
                            onBlur={(e)=>{handleBlur(e)
                                          dispayAgain(e)}}
                            type='password'
                            className={errors?.password?'warning':''}
                            onFocus={(e)=>handleFocus(e)}/>
                        <span>Password</span>
                    </label>
                    {errors?.password && <small name='password' className={styles.error}>{errors.password}</small>}
                    <label>
                        <input name="password2" 
                            placeholder="" 
                            onChange={(e)=>handleChange(e)}
                            onBlur={(e)=>{handleBlur(e)
                                            dispayAgain(e)}}
                            type='password'
                            className={errors?.password2?'warning':''}/>
                        <span>Repetir password</span>
                    </label>
                    {errors?.password2 && <small name="password2" className={styles.error}>{errors.password2}</small>}
                    <div className={styles.esGuapo}>
                        <label htmlFor='esGuapo'>Es guap@?</label>
                        <input name="esGuapo" 
                            id='esGuapo'
                            placeholder="" 
                            onChange={(e)=>handleChange(e)}
                            onBlur={(e)=>{handleBlur(e)
                                            dispayAgain(e)}}
                            type='checkbox'
                            value='on'
                            className={errors?.esGuapo?'warning':''}/>
                    </div>
                    {errors?.esGuapo && <small name="esGuapo" className={styles.errorGuapo+' '+styles.error}>{errors.esGuapo}</small>}
                </div>
                <div className={styles.buttons+' '+styles.flexCol}>
                    <button className='anim-btn' onClick={(e)=>handleSubmit(e)}>SIGN UP</button>
                </div>
            </form>
            <ModalPortal isOpen={isOpen} closeModal={closeModal}>
                <h3>{success?'Registro exitoso':'ERROR'}</h3>
                <p className={success?'success':styles.err}>{message}</p>
            </ModalPortal>
        </div>
    )
}

export default FormularioRegistro