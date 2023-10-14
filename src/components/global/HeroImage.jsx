import '../../assets/heroImageStyles.css'
const HeroImage=({image,title,text})=>{
    const img={
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
                          url(${image})`
    }
    return(
        <article style={img} className={'hero-image-container'}>
            <div>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
        </article>
    )
}
export default HeroImage