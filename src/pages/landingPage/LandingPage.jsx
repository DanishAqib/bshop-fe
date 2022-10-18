import { Barber } from "../../components/Barber"
import { Customer } from "../../components/Customer";
import "./landingPage.css"

export const LandingPage = () => {
  return (
    <>
    <div className="main">
      <div className="bodyContainer">
        <div className="bodyContainer__left">
          <h2>
            Welcome to <span>BookBarber</span>
          </h2>
          <p>Please select your role</p>
        </div>
        <div className="bodyContainer__right">
          <Barber />
          <Customer />
        </div>
      </div>
    </div>
    </>
  )
}