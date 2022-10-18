import React, { useState, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import "./customerDashboard.css";
import { srGetUserInfo } from "../../service/srUser";
import { NavBar } from '../../components/Navbar';

export const CustomerDashboard = () => {
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

  return (
    <>
    <div className='dashboard'>
      <NavBar u_info={u_info} />
      <div className="dasboard__container">
        <div className="dashboard__container-header">
          <h1>Customer Dashboard</h1>
        </div>
        <div className="dashboard__container-body">
          <div className="card">
            <div className="card__header">
              <h3>Make an Appointment</h3>
            </div>
            <div className="card__body">
              <p>
                Click here to make an appointment with your favorite barber.
              </p>
            </div>
            <div className="card__footer">
              <Link to="/make-appointment" state={{ u_info: u_info }}>
                <button>Make an Appointment</button>
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="card__header">
              <h3>View Current Appointment</h3>
            </div>
            <div className="card__body">
              <p>
                Click here to view your current appointments status with barber.
              </p>
            </div>
            <div className="card__footer">
              <Link to="/current-appointment" state={{ u_info: u_info }}>
                <button>View Current Appointment</button>
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="card__header">
              <h3>Appointments History</h3>
            </div>
            <div className="card__body">
              <p>
                Click here to view all of your previous appointments.
              </p>
            </div>
            <div className="card__footer">
              <Link to="/appointments-history" state={{ u_info: u_info }}>
                <button>Appointments History</button>
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="card__header">
              <h3>View My Profile</h3>
            </div>
            <div className="card__body">
              <p>
                Click here to view your profile and modify your details
              </p>
            </div>
            <div className="card__footer">
              <Link to="/settings" state={{ u_info: u_info }}>
                <button>View My Profile</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
};