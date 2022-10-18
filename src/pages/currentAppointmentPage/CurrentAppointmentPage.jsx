import React, {useEffect, useState} from "react";
import { NavBar } from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import { srRemoveAppointmentRequest, srGetUserAppointmentRequest } from '../../service/srUser';
import { formatePrice, formateDateAndTime } from "../../shared/utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./currentAppointmentPage.css";

export const CurrentAppointmentPage = () => {
  const location = useLocation();
  const u_info = location.state.u_info;
  if (!u_info) {
    window.location.href = "/";
  }

  const [appointmentRequests, setAppointmentRequests] = useState([]);

  useEffect(() => {
    srGetUserAppointmentRequest(u_info.u_id).then((res) => {
      if((res && res.length > 0) && res !== undefined){
        setAppointmentRequests(res);
      }
    });
  }, [u_info.u_id]);

  const cancelAppointment = (uar_id) => {
    srRemoveAppointmentRequest(uar_id).then((res) => {
      if (res) {
        const newAppointmentRequests = appointmentRequests.filter((item) => item.uar_id !== uar_id);
        setAppointmentRequests(newAppointmentRequests);
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
          <div className="current-appointment-page__container__body"
            style={{
              overflowY: appointmentRequests.length > 1 ? "scroll" : "hidden",
            }}
          >
            {
              appointmentRequests.length > 0 ? (
                appointmentRequests.map((appointmentRequest, index) => {
                  const { uar_id, uar_services, uar_total_price, uar_time, uar_status, uar_created_at, u_firstname, u_lastname, b_shop_name  } = appointmentRequest;
                  return (
                    <div className="page__container__body__card" key={index}>
                    <div className="current-appointment-page__card__details">
                      <div className="current-appointment-page__card__details-info">
                        <p>Barber Name: <span>{u_firstname} {u_lastname}</span></p>
                      </div>
                      <div className="current-appointment-page__card__details-info">
                        <p>Barber Shop Name: <span>{b_shop_name}</span></p>
                      </div>
                      <div className="current-appointment-page__card__details-info">
                        <p className="services">Selected Services: <span>{uar_services}</span></p>
                      </div>
                      <div className="current-appointment-page__card__details-info">
                        <p>Total Price: <span>Rs. {formatePrice(uar_total_price)}</span></p>
                      </div>
                      <div className="current-appointment-page__card__details-info">
                        <p>Appointment Time: <span>{uar_time}</span></p>
                      </div>
                      <div className="current-appointment-page__card__details-info">
                        <p>Created At: <span>{formateDateAndTime(uar_created_at)}</span></p>
                      </div>
                    </div>
                    <div className="current-appointment-page__card__status">
                      <div className="current-appointment-page__card__status__info">
                        <p>status: </p>
                        <h3 style={{
                          color: uar_status === "pending" ? "blue" : uar_status === "rejected" ? "red" : "green"
                        }}
                        >
                          {uar_status}
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          cancelAppointment(uar_id)
                          if (uar_status === "pending") {
                            toast.success("Appointment request canceled successfully", {
                              position: "top-right",
                            });
                          }
                          else {
                            toast.success("Appointment request removed successfully", {
                              position: "top-right",
                            })
                          }
                        }}
                      className="cancel__appointment-btn">{uar_status === "rejected" ? "Remove" : "Cancel Appointment"}</button>
                    </div>
                  </div>
                  )
                })
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
      <ToastContainer />
    </>
  )
};