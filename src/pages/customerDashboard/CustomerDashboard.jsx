import React, { useState, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import "./customerDashboard.css";
import { srGetUserName } from "../../service/srUser";

export const CustomerDashboard = () => {
  const location = useLocation();
  const u_email = location.state.u_email;
  if (!u_email) {
    alert("Invalid Credentials");
    window.location.href = "/";
  }
  const [u_firstname, setU_firstname] = useState("");
  useEffect(() => {
    srGetUserName(u_email).then((res) => {
      if (res) {
        if(u_firstname === "") {
          setU_firstname(res.u_firstname);
        }
      }
    });
  }, [u_email, u_firstname]);

  return (
    <>
    <div className='dashboard'>
      <div className="navbar">
        <div className="navbar__logo">
          <h1>Book<span>Barber</span></h1>
        </div>
        <div className="user__name">
          <h3>Hi, <span>{u_firstname}</span></h3>
        </div>
        <div className="logout-btn">
          <button style={{width:"10rem"}}
            onClick={() => {
              window.location.href = "/";
            }}
          >Logout</button>
        </div>
      </div>
      <div className="dasboard__container">
        <div className="card">
          <div className="card__header">
            <h3>Make an Appointment</h3>
          </div>
          <div className="card__body">
            <p>
              Make an appointment with your favorite barber and get your hair cut
              with the best barbers in town.
              click here to continue.
            </p>
          </div>
          <div className="card__footer">
            <Link to="/make-appointment">
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
              View your current appointment with barber
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
            <Link to="/settings">
              <button>Settings</button>
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card__header">
            <h3>View My Profile</h3>
          </div>
          <div className="card__body">
            <p>
              Click here to view your profile and see your details
            </p>
          </div>
          <div className="card__footer">
            <Link to="/view-my-profile">
              <button>View My Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
};