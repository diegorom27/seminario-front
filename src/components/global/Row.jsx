const Row = ({ registro }) => {
  return (
        <tr>
            {
                registro.map((el,i)=><td>{el}</td>)
            }
        </tr>
    )
}
export default Row
