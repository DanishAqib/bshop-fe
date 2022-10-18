import React, {useEffect, useState} from "react";
import { NavBar } from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import { srGetAllAppointmentRequestsForBarber, srUpdateAppointmentRequestStatus } from "../../service/srBarber";
import { ChangeAppointmentStatusDialog } from "../../components/ChangeAppointmentStatusDialog";
import { formatePrice } from "../../shared/utils";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./barberCurrentAppointmentPage.css";

export const BarberCurrentAppointmentPage = () => {
  const location = useLocation();
  const u_info = location.state.u_info;
  if (!u_info) {
    window.location.href = "/";
  }
  const [openStatusChangeDialog, setOpenStatusChangeDialog] = useState(false);
  const [statusValue, setStatusValue] = useState();
  const [isValueSelected, setIsValueSelected] = useState(false);
  const [selectedAptId, setSelectedAptId] = useState();
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [customerName, setCustomerName] = useState("");

  useEffect(()=>{
    srGetAllAppointmentRequestsForBarber(u_info.u_id, "approved").then((res)=>{
      if((res && res.length > 0) && res !== undefined){
        setAppointmentRequests(res);
      }
    })
  },[u_info.u_id]);

  const updateAppointmentRequestStatus = (uar_id, status) => {
    srUpdateAppointmentRequestStatus(uar_id, status).then((res)=>{
      if(res){
        const newAppointmentRequests = appointmentRequests.filter((item)=>item.uar_id !== uar_id);
        setAppointmentRequests(newAppointmentRequests);
      }
    })
  }

  return (
    <>
      <NavBar u_info={u_info} />
      <div className="current-appointment-page"
        style={{ opacity: openStatusChangeDialog ? 0.5 : 1, pointerEvents: openStatusChangeDialog ? 'none' : 'auto' }}
      >
        <div className="current-appointment-page__container">
          <div className="current-appointment-page__container__header">
            <h3>Current Appointments</h3>
          </div>
          <div className="barber-current-appointment-page__container__body"
            style={{
              overflowY: appointmentRequests.length > 1 ? "scroll" : "hidden",
            }}
          >
          {
            appointmentRequests.length > 0 ? (
              appointmentRequests.map((appointmentRequest, index) => {
                const { uar_id, uar_services, uar_time, uar_total_price, uar_status, users_info } = appointmentRequest;
                const { u_firstname, u_lastname } = users_info;
                return (
                  <div className="page__container__body__card" key={index}>
                    <div className="current-appointment-page__card__details">
                      <div className="current-appointment-page__card__details-info">
                        <p>Customer Name: <span>{u_firstname} {u_lastname}</span></p>
                      </div>
                      <div className="current-appointment-page__card__details-info">
                        <p>Appointment Time: <span>{uar_time}</span></p>
                      </div>
                      <div className="current-appointment-page__card__details-info">
                        <p>Appointment Services: <span>{uar_services}</span></p>
                      </div>
                      <div className="current-appointment-page__card__details-info">
                        <p>Total Price: <span>Rs. {formatePrice(uar_total_price)}</span></p>
                      </div>
                    </div>
                    <div className="current-appointment-page__card__status">
                      <div className="current-appointment-page__card__status-info">
                        <p>Appointment Status: </p>
                        <h3
                          style={{
                            color: "#9c741e",
                          }}
                        >{uar_status}</h3>
                      </div>
                      <button title="change status to completed" className="current-appointment-page__card__status-button"
                        onClick={() => {
                          setOpenStatusChangeDialog(!openStatusChangeDialog);
                          setSelectedAptId(uar_id);
                          setCustomerName(`${u_firstname} ${u_lastname}`);
                        }}
                      >Change Status</button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="confirm-appointment-page__container__body__no-appointment">
                You Currently Don't Have Any In Process Appointments.
              </div>
            )
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
      {
        openStatusChangeDialog && (
          <ChangeAppointmentStatusDialog
            openStatusChangeDialog={openStatusChangeDialog}
            setOpenStatusChangeDialog={setOpenStatusChangeDialog}
            statusValue={statusValue}
            setStatusValue={setStatusValue}
            isValueSelected={isValueSelected}
            setIsValueSelected={setIsValueSelected}
            updateAppointmentRequestStatus={updateAppointmentRequestStatus}
            selectedAptId={selectedAptId}
            customerName={customerName}
            setCustomerName={setCustomerName}
          />
      )}
      <ToastContainer />
    </>
  )
};