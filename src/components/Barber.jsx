import BarberLogo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

export const Barber = () => {
  return (
    <>
      <div className="logoCard">
          <img src={BarberLogo} alt="barber shop logo" />
          <Link className='logoButton' style={{marginTop: "0"}} to="/login" state={{isBarber: true}}>Barber</Link>
      </div>
    </>
  )
}
