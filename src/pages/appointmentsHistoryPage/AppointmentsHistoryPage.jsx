import React, {useEffect, useState} from "react";
import { NavBar } from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import { srGetAllUserAppointmentRequests, srRemoveAppointmentRequest } from "../../service/srUser";
import { formatePrice, formateDateAndTime } from "../../shared/utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./appointmentsHistoryPage.css";

export const AppointmentsHistoryPage = () => {
  const location = useLocation();
  const u_info = location.state.u_info;
  if (!u_info) {
    window.location.href = "/";
  }

  const [appointmentRequests, setAppointmentRequests] = useState([]);

  useEffect(() => {
    srGetAllUserAppointmentRequests(u_info.u_id, "completed").then((res) => {
      if((res && res.length > 0) && res !== undefined){
        setAppointmentRequests(res);
      }
    });
  }, [u_info.u_id]);

  const removeAppointment = (uar_id) => {
    srRemoveAppointmentRequest(uar_id).then((res) => {
      if (res) {
        const newAppointmentRequests = appointmentRequests.filter((item) => item.uar_id !== uar_id);
        setAppointmentRequests(newAppointmentRequests);
        toast.success("Appointment removed successfully");
      }
    });
  };

  return (
    <>
      <NavBar u_info={u_info} />
      <div className="current-appointment-page">
        <div className="current-appointment-page__container">
          <div className="current-appointment-page__container__header">
            <h3>Appointments History</h3>
          </div>
          <div className="appointment-history-page__container__body"
            style={{
              overflowY: appointmentRequests.length > 1 ? "scroll" : "hidden",
            }}
          >
            {
              appointmentRequests.length > 0 ? (
                appointmentRequests.map((appointmentRequest, index) => {
                  const { uar_id, uar_services, uar_total_price, uar_status, uar_updated_at, barber, barberInfo } = appointmentRequest;
                  const { u_firstname, u_lastname } = barber;
                  const { b_shop_name } = barberInfo;
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
                          <p>Selected Services: <span>{uar_services}</span></p>
                        </div>
                        <div className="current-appointment-page__card__details-info">
                          <p>Total Price: <span>Rs. {formatePrice(uar_total_price)}</span></p>
                        </div>
                        <div className="current-appointment-page__card__details-info">
                          <p>Appointment Completed At: <span>{formateDateAndTime(uar_updated_at)}</span></p>
                        </div>
                      </div>
                      <div className="current-appointment-page__card__status">
                        <div className="current-appointment-page__card__status__info">
                          <p>Status: </p>
                          <h3 style={{ color: "#4caf50" }}>{uar_status}</h3>
                        </div>
                        <button style={{ backgroundColor: "red" }}
                          onClick={() => {
                            removeAppointment(uar_id)
                          }}
                        >Remove</button>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="current-appointment-page__container__body__no-appointment">
                  No Appointment History Found
                </div>
              )
            }
          </div>
          <div className="confirm-appointment-page__container__footer">
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