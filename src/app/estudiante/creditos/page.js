import '../../../assets/starWarsTextStyles.css'
const creditos =()=>{
    const style1={
        width:"100vw",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'black',
        aspectRatio:'16/9',
        overflow:'hidden'
    }
    return(
        <div style={style1}>
            <div className="starwars-text">
            <p>
                Project Manager: Checho<br/>
                Software Developer: Checho<br/>
                UI/UX Designer: Checho<br/>
                Quality Assurance Engineer: Checho<br/>
                DevOps Engineer: Checho<br/>
                System Architect: Checho<br/>
                Business Analyst: Checho<br/>
                Database Administrator: Checho<br/>
                Technical Writer: Checho<br/>
                Security Analyst: Checho<br/>
                Release Manager: Checho<br/>
                Product Owner: Checho<br/>
                Scrum Master: Checho<br/>
                Frontend Developer: Checho<br/>
                Backend Developer: Checho<br/>
                Otros: Kevin Chaparro,<br/>
                       Daniel,<br/> 
                       Gabo Dubuc<br/>
                       Diego Róman
            </p>
            </div>
        </div>
    )
}
export default creditos