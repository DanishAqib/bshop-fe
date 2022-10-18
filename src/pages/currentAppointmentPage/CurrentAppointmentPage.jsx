import React, {useEffect, useState} from "react";
import { NavBar } from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import { srRemoveAppointmentRequest, srGetUserAppointmentRequest } from '../../service/srUser';
import { formatePrice, formateDateAndTime } from "../../shared/utils";
import "./currentAppointmentPage.css";

export const CurrentAppointmentPage = () => {
  const location = useLocation();
  const u_info = location.state.u_info;
  if (!u_info) {
    window.location.href = "/";
  }

  const [appointmentRequests, setAppointmentRequests] = useState({
    uar_id: "",
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

  useEffect(() => {
    srGetUserAppointmentRequest(u_info.u_id).then((res) => {
      if (res) {
        setAppointmentRequests(res);
        setBarber(res.barber);
        setBarberInfo(res.barber_info);
      }
    });
  }, [u_info.u_id]);

  const cancelAppointment = (uar_id) => {
    srRemoveAppointmentRequest(uar_id).then((res) => {
      if (res) {
        alert("Appointment cancelled");
        window.location.reload();
      }
    });
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
              appointmentRequests.uar_id !== "" ? (
              <div className="page__container__body__card">
              <div className="current-appointment-page__card__details">
                <div className="current-appointment-page__card__details-info">
                  <p>Barber Name: <span>{barber.u_firstname} {barber.u_lastname}</span></p>
                </div>
                <div className="current-appointment-page__card__details-info">
                  <p>Barber Shop Name: <span>{barberInfo.b_shop_name}</span></p>
                </div>
                <div className="current-appointment-page__card__details-info">
                  <p className="services">Selected Services: <span>{appointmentRequests.uar_services}</span></p>
                </div>
                <div className="current-appointment-page__card__details-info">
                  <p>Total Price: <span>Rs. {formatePrice(appointmentRequests.uar_total_price)}</span></p>
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
                    color: appointmentRequests.uar_status === "pending" ? "blue" : appointmentRequests.uar_status === "rejected" ? "red" : "green"
                  }}
                  >
                    {appointmentRequests.uar_status}
                  </h3>
                </div>
                <button
                  onClick={() => cancelAppointment(appointmentRequests.uar_id)}
                className="cancel__appointment-btn">{appointmentRequests.uar_status === "rejected" ? "Remove" : "Cancel Appointment"}</button>
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