'use client'
import { post } from '../helpers/helperHttp'
import styles from './page.module.css'
import useForm from '../components/CustomHooks/useForm'
import server from '../assets/server.js'
import { useModal } from '../components/CustomHooks/useModal'
import ModalPortal from '../components/global/Modal'
import { useRouter } from 'next/navigation'
const {protocol,domain,port} = server

const initialForm={
    correo:'',
    password:'',
    password2:'',
    esGuapo:false
}
const constraints=({correo,password})=>{
    let error={}

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
    return error
}

const submit=async({correo,password,esGuapo})=>{
    await new Promise(resolve=>setTimeout(resolve,1000))
    
    return post(`${protocol}://${domain}:${port}/auth/registro`,{
        body:{
            'correo':correo,
            'contrasena':password,
            'esGuapo':esGuapo
        },
        isFormData:false,
        headers: {
            'Accept': "application/json, text/plain, */*",
            'Content-Type': "application/json;charset=utf-8"
        }
    })
} 

export default function Home() {

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
  } = useForm(initialForm,constraints,submit,()=>{openModal()}) 

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

  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form className={styles.form+' '+styles.boxShadow}
            onSubmit={(e)=>handleSubmit(e)}>
          <div className={styles.title+' '+styles.flexCol+' '+styles.boxShadow}>
              <h4>Hello - Log In</h4>
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
          </div>
          <div className={styles.buttons+' '+styles.flexCol}>
              <button>LOG IN</button>
          </div>
          <div className={styles.signUpLink}>
            <label><small>Don't have an account?<b onClick={()=>router.push('/registro')}>Sign up</b></small></label>
          </div>
      </form>
      <ModalPortal isOpen={isOpen} closeModal={closeModal}>
          <h3>{success?'Registro exitoso':'ERROR'}</h3>
          <p className={(success==true)?'success':styles.err}>{message}</p>
      </ModalPortal>
    </main>
  )
}
