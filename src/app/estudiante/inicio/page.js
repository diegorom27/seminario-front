import { cookies } from 'next/headers'
import HeroImage from "@/components/global/HeroImage"

const Inicio=()=>{
    const img='https://wallpapersmug.com/download/3840x2160/11a3dc/firewatch-game-sunset-artwork.jpg'
    const user = cookies().get('user')
    const id = cookies().get('idUsuario')
    
    const title=` Bienvenid@ 
${user.value.split('@')[0]}, tu id es: ${id.value}`
    const text=`Listo para reservar guap@?
╰(*°▽°*)╯`
    return(
        <>
            <HeroImage title={title} image={img} text={text}/>
        </>
        )
}
export default Inicio