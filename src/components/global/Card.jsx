import '../../assets/cardStyles.css'
const Card=({front,back})=>{
    return(
        <article className={"card flipCard"}>
            <div className={"face cardFront cardInfo"}>
                {front}       
            </div>
            <div className={"face cardBack"}>
                {back}
            </div>
        </article>
    )
}
export default Card
