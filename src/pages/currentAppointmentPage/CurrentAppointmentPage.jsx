import React, {useEffect, useState} from "react";
import { NavBar } from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import { srCancelAppointmentRequest, srGetUserAppointmentRequest, srCheckIfAppointmentRequestExists } from '../../service/srUser';
import "./currentAppointmentPage.css";

export const CurrentAppointmentPage = () => {
  const location = useLocation();
  const u_info = location.state.u_info;
  if (!u_info) {
    window.location.href = "/";
  }

  const [appointmentRequests, setAppointmentRequests] = useState({
    uar_services: "",
    uar_time: "",
    uar_total_price: "",
    uar_status: "",
    uar_created_at: "",
  });

  const [barber, setBarber] = useState({
    u_firstname: "",
    u_lastname: "",
  });

  const [barberInfo, setBarberInfo] = useState({
    b_shop_name: "",
  });

  const [appointmentExists, setAppointmentExists] = useState(false);

  useEffect(() => {
    srGetUserAppointmentRequest(u_info.u_id).then((res) => {
      if (res) {
        setAppointmentRequests(res);
        setBarber(res.barber);
        setBarberInfo(res.barber_info);
      }
    });
    srCheckIfAppointmentRequestExists(u_info.u_id).then((res) => {
      console.log(res);
      if (res !== false) {
        setAppointmentExists(true);
      }
    });
  }, [u_info.u_id]);

  const cancelAppointment = (u_id) => {
    srCancelAppointmentRequest(u_id).then((res) => {
      if (res) {
        setAppointmentExists(false);
        alert("Appointment cancelled");
      }
    });
  };


  const formateDateAndTime = (date) => {
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const year = date.slice(0, 4);
    const time = date.slice(11, 16);
    const monthName = new Date(year, month - 1, day).toLocaleString('default', { month: 'long' });
    return `${monthName} ${day}, ${year} at ${time}`;
  };

  return (
    <>
      <NavBar u_info={u_info} />
      <div className="current-appointment-page">
        <div className="current-appointment-page__container">
          <div className="current-appointment-page__container__header">
            <h3>Current Appointment</h3>
          </div>
          <div className="current-appointment-page__container__body">
            {
              appointmentExists ? (
              <div className="current-appointment-page__container__body__card">
              <div className="current-appointment-page__card__details">
                <div className="current-appointment-page__card__details-info">
                  <p>Barber Name: <span>{barber.u_firstname}</span></p>
                </div>
                <div className="current-appointment-page__card__details-info">
                  <p>Barber Shop Name: <span>{barberInfo.b_shop_name}</span></p>
                </div>
                <div className="current-appointment-page__card__details-info">
                  <p className="services">Selected Services: <span>{appointmentRequests.uar_services}</span></p>
                </div>
                <div className="current-appointment-page__card__details-info">
                  <p>Total Price: <span>Rs. {appointmentRequests.uar_total_price}</span></p>
                </div>
                <div className="current-appointment-page__card__details-info">
                  <p>Appointment Time: <span>{appointmentRequests.uar_time}</span></p>
                </div>
                <div className="current-appointment-page__card__details-info">
                  <p>Created At: <span>{formateDateAndTime(appointmentRequests.uar_created_at)}</span></p>
                </div>
              </div>
              <div className="current-appointment-page__card__status">
                <div className="current-appointment-page__card__status__info">
                  <p>status: </p>
                  <h3 style={{
                    color: appointmentRequests.uar_status === "pending" ? "red" : "green"}}
                  >
                    {appointmentRequests.uar_status}
                  </h3>
                </div>
                <button
                  onClick={() => cancelAppointment(u_info.u_id)}
                className="cancel__appointment-btn">Cancel Appointment</button>
              </div>
            </div>
            ) : <div className="current-appointment-page__container__no-appointment">You currently have no appointment</div>
          }
          </div>
          <div className="current-appointment-page__container__footer">
            <button
              onClick={() => {
                window.history.back();
              }}
            >Go Back</button>
          </div>
        </div>
      </div>
    </>
  )
};