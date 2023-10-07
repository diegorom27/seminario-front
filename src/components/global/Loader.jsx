import Image from 'next/image'
import loadImg from '../../assets/Infinity-1s-200px.svg'
const Loader = () => {
  return (
        <Image alt='loader' src={loadImg} style={{
          filter: 'drop-shadow(1px 1px 1px black) grayscale(0.8)',
          width: '5.5rem',
          height: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}/>
  )
}
export default Loader
