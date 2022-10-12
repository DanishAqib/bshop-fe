import { Barber } from "../../components/Barber"
import { Customer } from "../../components/Customer";
import "./landingPage.css"

export const LandingPage = () => {
  return (
    <>
    <div className="main">
      <div className="bodyContainer">
        <Barber />
        <Customer />
      </div>
    </div>
    </>
  )
}