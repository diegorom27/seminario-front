'use client'
import { post,get } from '@/helpers/helperHttp'
import {setCookie,deleteCookie,getCookie} from '@/helpers/clientCookies'
import styles from './page.module.css'
import useForm from '@/components/CustomHooks/useForm'
import server from '@/assets/server.js'
import { useModal } from '@/components/CustomHooks/useModal'
import ModalPortal from '@/components/global/Modal'
import { useRouter } from 'next/navigation'
const {protocol,domain,port} = server

const url = `${protocol}://${domain}:${port}`

const initialForm={
    correo:'',
    password:''
}
const constraints=({correo,password})=>{
    let error={}

    if(!/^[a-z0-9_\-\.]+@[a-z1-9_\-\.]+[^-_\.]\.[a-z]+$/gi.test(correo.trim())){
        error['correo']='El correo suministrado no es valido.'
    }else{
        delete error['correo']
    }
    if(!/^[0-9a-zñáéíóúü_\is]{1,12}$/i.test(password.trim())){
        error['password']='La contraseña no cumple los estandares.'
    }else{
        delete error['password']
    }
    return error
}
const redirect=async(router)=>{
  let token = getCookie(document,'token')
  const res = await get(`${url}/token/actual-usuario/`,{
    headers: {
    'Content-Type': "application/json;charset=utf-8",
    'Authorization':"Bearer "+token
    }
  })
  //falta logica para acceso a los demas tipos de usuario
  const rol = await res?.rol?.nombreRol || null
  if(rol=='NORMAL'){
    router.push('/estudiante/inicio')
  }
}

const submit=async({correo,password})=>{
    await new Promise(resolve=>setTimeout(resolve,500))
    
    return post(`${protocol}://${domain}:${port}/token/generar/`,{
        body:{
            'username':correo,
            'contrasena':password
        },
        isFormData:false,
        headers: {
            'Accept': "application/json, text/plain, */*",
            'Content-Type': "application/json;charset=utf-8"
        }
    })
} 

export default function Home() {


  const router = useRouter()

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
  } = useForm(initialForm,constraints,submit,(success,res)=>{
    openModal()
    !success && setTimeout(()=>{
      let date = new Date();

      date.setDate(date.getDate() + 7);

      //delete cookies
      deleteCookie(document,'token')
      deleteCookie(document,'password')
      deleteCookie(document,'user')
      
      //new cookies
      setCookie(document,'token', res.token, {expires: date, 'max-age': 3600});
      setCookie(document,'password', form.password, {expires: date, 'max-age': 3600});
      setCookie(document,'user', form.correo, {expires: date, 'max-age': 3600});
      
      redirect(router)

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

  return (
    <main className={styles.container}>
        <form className={styles.form+' '+styles.boxShadow}
              onSubmit={(e)=>handleSubmit(e)}
              method='POST'>
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
              <button  type='submit'>LOG IN</button>
          </div>
          <div className={styles.signUpLink}>
            <label><small>Don't have an account?<b onClick={()=>router.push('/registro')}>Sign up</b></small></label>
          </div>
      </form>
      <ModalPortal isOpen={isOpen} closeModal={closeModal}>
          <h3>{success?'Acceso exitoso':'ERROR'}</h3>
          <p className={(success==true)?'success':styles.err}>{message}</p>
      </ModalPortal>
    </main>
  )
}
