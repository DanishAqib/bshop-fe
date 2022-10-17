import React, { useState, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import "./barberDashboard.css";
import { srGetUserInfo } from "../../service/srUser";
import { StatusDialog } from '../../components/StatusDialog';
import { NavBar } from '../../components/Navbar';

export const BarberDashboard = () => {
  const location = useLocation();
  const u_email = location.state.u_email;
  if (!u_email) {
    alert("Invalid Credentials");
    window.location.href = "/";
  }
  const [u_info, setU_info] = useState({});
  useEffect(() => {
    srGetUserInfo(u_email).then((res) => {
      if (res) {
        if(u_info.u_firstname !== res.u_firstname) {
          setU_info(res);
        }
      }
    });
  }, [u_email, u_info]);

  const [openStatusChangeDialog, setOpenStatusChangeDialog] = useState(false);

  return (
    <>
    <div className='dashboard'
      style={{ opacity: openStatusChangeDialog ? 0.5 : 1, pointerEvents: openStatusChangeDialog ? 'none' : 'auto' }}
    >
      <NavBar u_info={u_info} />
      <div className="dasboard__container">
        <div className="card">
          <div className="card__header">
            <h3>Appointment Requests</h3>
          </div>
          <div className="card__body">
            <p>
              Click here to see appointments requested by customers to you and confirm them.
            </p>
          </div>
          <div className="card__footer">
            <Link to="/confirm-appointment" state={{ u_info: u_info }}>
              <button>Confirm an Appointment</button>
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card__header">
            <h3>View Current Appointment</h3>
          </div>
          <div className="card__body">
            <p>
              View your current appointment with customer.
            </p>
          </div>
          <div className="card__footer">
            <Link to="/view-current-appointment">
              <button>View Current Appointment</button>
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card__header">
            <h3>Settings</h3>
          </div>
          <div className="card__body">
            <p>
              Click here to modify your account settings and update your profile
            </p>
          </div>
          <div className="card__footer">
            <Link to="/settings" state={{ u_info: u_info }} >
              <button>Settings</button>
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card__header">
            <h3>Update Status</h3>
          </div>
          <div className="card__body">
            <p>
              Click here to modify your profile status to let customers know if you are available or not.
            </p>
          </div>
          <div className="card__footer">
            <button
              onClick={() => setOpenStatusChangeDialog(true)}
            >Change Status</button>
          </div>
        </div>
      </div>
    </div>
    {openStatusChangeDialog && <StatusDialog setOpenStatusChangeDialog={setOpenStatusChangeDialog} u_id={u_info.u_id} />}
    </>
  )
};