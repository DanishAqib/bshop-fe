import React, {useEffect, useState} from 'react';
import { NavBar } from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import { srGetUserInfo, srCheckIfAppointmentRequestExists } from '../../service/srUser';
import { srGetAllBarbers } from '../../service/srBarber';
import { SelectTimeDialog } from '../../components/SelectTimeDialog';
import "./makeAppointmentPage.css";

export const MakeAppointmentPage = () => {
  const location = useLocation();
  const u_email = location.state.u_info.u_email;
  if (!u_email) {
    window.location.href = "/";
  }
  const [u_id, setU_id] = useState("");
  const [u_info, setU_info] = useState({});
  const [barber_info, setBarber_info] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [appointmentExists, setAppointmentExists] = useState(false);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [selectTimeDialog, setSelectTimeDialog] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState({});
  const availableTimeSlots = [
    '9:00 AM',
    '11:00 AM',
    '1:00 PM',
    '3:00 PM',
    '5:00 PM',
    '7:00 PM',
  ];

  useEffect(() => {
    srGetUserInfo(u_email).then((res) => {
      if (res) {
        if(u_info.u_firstname !== res.u_firstname) {
          setU_info(res);
          setU_id(res.u_id);
        }
      }
    });
    srGetAllBarbers().then((res) => {
      if (res) {
        if(barber_info.length !== res.length) {
          setBarber_info(res);
        }
      }
    });
    srCheckIfAppointmentRequestExists(u_id).then((res) => {
      if (res !== false && res !== undefined) {
        setAppointmentExists(true);
      }
    });
  }, [u_email, u_info, barber_info, u_id]);
  return (
    <>
    <div
      style={{ opacity: selectTimeDialog ? 0.5 : 1, pointerEvents: selectTimeDialog ? 'none' : 'auto' }}
    >
      <NavBar u_info={u_info}/>
      <div className='make-appointment-page'>
        <div className="make-appointment-page__container">
          <h3 className="make-appointment-page__title">Select Barber</h3>
          <div className="make-appointment-page__search">
            <input type="text" placeholder="Search for barber" 
              onChange={(e) => {
                setSearchValue(e.target.value);
              }} 
            />
          </div>
          <div className="make-appointment-page__shop-list">
            {
              barber_info.filter((barber) => {
                if (searchValue === '') {
                  return barber;
                } else if (barber.b_shop_name.toLowerCase().includes(searchValue.toLowerCase())
                  || barber.u_firstname.toLowerCase().includes(searchValue.toLowerCase())
                  || barber.b_city.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  return barber;
                }
                return null
              }).map((barber) => {
                return (
                  <>
                    <div className="make-appointment-page__shop"
                      key={barber.b_id}
                    >
                      <h4>Shop Info</h4>
                      <div className="make-appointment-page__shop__info">
                        <h5>Shop Name: <span>{barber.b_shop_name}</span></h5>
                        <h5>Barber Name: <span>{barber.u_firstname} {barber.u_lastname}</span></h5>
                        <h5>Shop Location: <span>{barber.b_city}</span></h5>
                        <h5>Shop Status: 
                          <span
                            style={{
                              color: barber.b_status === "available" ? "green" : "red"
                            }}
                          > {barber.b_status}</span></h5>
                      </div>
                      <button type="button"
                        className={`make-appointment-page__shop__select-barber ${barber.b_status === "available" ? "" : "disable-btn"}`}
                        onClick={() => {
                          if (!appointmentExists) {
                            setSelectTimeDialog(!selectTimeDialog);
                            setSelectedBarber(barber);
                          }
                          else {
                            alert("You already have an appointment request");
                          }
                        }}
                      >
                      {
                        barber.b_status === "available" ? "Select Barber" : "Unavailable"
                      }
                      </button>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
    {
      selectTimeDialog && 
      <SelectTimeDialog 
        availableTimeSlots={availableTimeSlots}
        appointmentTime={appointmentTime}
        setAppointmentTime={setAppointmentTime}
        setSelectTimeDialog={setSelectTimeDialog}
        selectTimeDialog={selectTimeDialog}
        u_info={u_info}
        selectedBarber={selectedBarber}
        setSelectedBarber={setSelectedBarber}
      />
    }
  </>
  );
}