import customerLogo from '../assets/images/customer.png';
import { Link } from 'react-router-dom';

export const Customer = () => {
  return (
    <>
      <div className="logoCard">
          <img src={customerLogo} alt="customer logo" />
          <Link className='logoButton' to="/login" state={{from: "customer"}} >Customer</Link>
      </div>
    </>  
  )
}