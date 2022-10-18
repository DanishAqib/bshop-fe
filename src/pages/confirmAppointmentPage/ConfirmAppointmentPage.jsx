import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "../../components/Navbar";
import { srGetAllAppointmentRequestsForBarber, srUpdateAppointmentRequestStatus } from "../../service/srBarber";
import { formatePrice, formateDateAndTime } from "../../shared/utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./confirmAppointmentPage.css";

export const ConfirmAppointmentPage = () => {
  const location = useLocation();
  const u_info = location.state.u_info;
  if (!u_info) {
    window.location.href = "/";
  }

  const [appointmentRequests, setAppointmentRequests] = useState([]);
  
  useEffect(()=>{
    srGetAllAppointmentRequestsForBarber(u_info.u_id, "pending").then((res)=>{
      if((res && res.length > 0) && res !== undefined){
        setAppointmentRequests(res);
      }
    })
  },[u_info.u_id, appointmentRequests]);

  const updateAppointmentRequestStatus = (uar_id, status) => {
    srUpdateAppointmentRequestStatus(uar_id, status).then((res)=>{
      if(res){
        const newAppointmentRequests = appointmentRequests.filter((item)=>item.uar_id !== uar_id);
        setAppointmentRequests(newAppointmentRequests);
      }
    })
  }

  return(
    <>
      <NavBar u_info={u_info} />
      <div className="confirm-appointment-page">
        <div className="confirm-appointment-page__container">
          <div className="confirm-appointment-page__container__header">
            <h1>Appointment Requests</h1>
          </div>
          <div className="confirm-appointment-page__container__body"
            style={{
              overflowY: appointmentRequests.length > 1 ? "scroll" : "hidden",
            }}
          >
            { appointmentRequests.length > 0 ? (
                appointmentRequests.map((appointmentRequest, index)=>{
                  const { uar_id, uar_services, uar_time, uar_total_price, uar_status, uar_created_at, users_info } = appointmentRequest;
                  const { u_firstname, u_lastname } = users_info;
                  return (
                    <div className="page__container__body__card" key={index}>
                      <div className="confirm-appointment-page__card__details">
                        <div className="confirm-appointment-page__card__details-info">
                          <p>Customer Name: <span>{u_firstname} {u_lastname}</span></p>
                        </div>
                        <div className="confirm-appointment-page__card__details-info">
                          <p>Customer Selected Services: <span>{uar_services}</span></p>
                        </div>
                        <div className="confirm-appointment-page__card__details-info">
                          <p>Total Price: <span>Rs. {formatePrice(uar_total_price)}</span></p>
                        </div>
                        <div className="confirm-appointment-page__card__details-info">
                          <p>Appointment Time: <span>{uar_time}</span></p>
                        </div>
                        <div className="confirm-appointment-page__card__details-info">
                          <p>Created At: <span>{formateDateAndTime(uar_created_at)}</span></p>
                        </div>
                      </div>
                      <div className="confirm-appointment-page__card__status">
                        <div className="confirm-appointment-page__card__status__info">
                          <p>status: </p>
                          <h3 style={{ 
                            color: uar_status === "pending" ? "blue" : "green"
                          }}>{uar_status}</h3>
                        </div>
                        <div className="confirm-appointment-page__card__status__btns">
                          <button className="confirm__appointment-btn"
                            onClick={()=>{
                              updateAppointmentRequestStatus(uar_id, "approved")
                              toast.success(`Appointment with ${u_firstname} ${u_lastname} approved!`, {
                                position: "top-right",
                              })
                            }}
                          >Confirm</button>
                          <button className="reject__appointment-btn"
                            onClick={()=>{
                              updateAppointmentRequestStatus(uar_id, "rejected")
                              toast.error(`Appointment with ${u_firstname} ${u_lastname} rejected!`, {
                                position: "top-right",
                              })
                            }}
                          >Reject</button>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="confirm-appointment-page__container__body__no-appointment">
                  No Appointment Requests
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