import { srMakeAppoinmentRequest } from "../service/srUser";
import { formatePrice } from "../shared/utils";

export const CartDialog = ({
  selectedServices,
  totalPrice,
  openCartDialog,
  setOpenCartDialog,
  u_info,
  appointmentTime,
  selectedBarber,
}) => {
  const servicesNames = selectedServices.map((service) => service.s_name).join(", ");
  const { u_id } = u_info;
  const { b_id } = selectedBarber;
  return (
    <>
      <div className="cart__dialog services__dialog">
        <div className="cart__dialog__container">
          <h3>Cart</h3>
          <div className="selected__services__list">
            {
              selectedServices.map((service) => {
                const {s_id, s_name, s_price} = service;
                return (
                  <div className="selected__services__list__item" key={s_id}>
                    <div className="services__list-item">{s_name}<span> Rs. {formatePrice(s_price)}</span></div>
                  </div>
                )
              })
            }
          </div>
          <div className="selected__services__list__item__total">
            <h4 className="services__list-item" style={{fontWeight: "bold"}}>Total Price<span>Rs. {formatePrice(totalPrice)}</span></h4>
          </div>
        </div>
        <div className="cart__dialog__button__container">
          <button style={{backgroundColor:"red"}}
            onClick={() => {
              setOpenCartDialog(!openCartDialog);
            }}
            className="services__dialog__button">Close</button>
          <button className={`services__dialog__button ${selectedServices.length === 0 ? "disable-btn" : ""}`}
            style={{width: "max-content"}}
            onClick={() => {
              srMakeAppoinmentRequest(u_id, b_id, appointmentTime, servicesNames, totalPrice)
              alert("Congratulations, your appointment has been booked!");
              window.history.go(-2);
              setOpenCartDialog(!openCartDialog);
            }}
            >Confirm Appointment</button>
        </div>
      </div>
    </>
  )
}