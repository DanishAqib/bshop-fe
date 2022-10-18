import React, { useState, useEffect } from 'react';
import {useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import { NavBar } from '../../components/Navbar';
import { srGetBarberInfo } from '../../service/srBarber';
import { srGetUserInfo } from '../../service/srUser';
import { srUpdateUserInfo } from '../../service/srUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./settingsPage.css";

export const SettingsPage = () => {
  const location = useLocation();
  const u_email = location.state.u_info.u_email;
  if (!u_email) {
    window.location.href = "/";
  }
  
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [u_info, setU_info] = useState({
    u_id: "",
    u_firstname: "",
    u_lastname: "",
    u_password: "",
    u_role: "",
  });

  const [b_city, setB_city] = useState("");
  const [b_shop_name, setB_shop_name] = useState("");

  useEffect(() => {
    srGetUserInfo(u_email).then((res) => {
      if (res) {
        setU_info({
          u_id: res.u_id,
          u_firstname: res.u_firstname,
          u_lastname: res.u_lastname,
          u_password: res.u_password,
          u_role: res.u_role,
        });
      }
    });
    srGetBarberInfo(u_email).then((res) => {
      if (res) {
        setB_city(res.b_city);
        setB_shop_name(res.b_shop_name);
      }
    });
  }, [u_email]);

  return (
    <>
      <NavBar u_info={{
        ...u_info,
        u_role: u_info.u_role,
        u_email: u_email,
      }}/>
      <div className="settings-page">
        <div className="settings-page__container">
          <h3 className="settings-page__header">Update Profile</h3>
          <div className="settings-page__profile">
            <div className="settings-page__container__left">
              <Form className='settings-page__form'
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Form.Group className="inputGrp edit-form" controlId="formBasicFname">
                  <Form.Label className='form-label'>First Name</Form.Label>
                  <Form.Control className="settings-input input" name="u_firstname" type="text" placeholder={u_info.u_firstname} disabled={!isInEditMode}
                    defaultValue={u_info.u_firstname}
                    onChange={(e) => {
                      u_info.u_firstname = e.target.value;
                    }}
                  />
                </Form.Group>
                <Form.Group className="inputGrp edit-form" controlId="formBasicLname">
                  <Form.Label className='form-label'>Last Name</Form.Label>
                  <Form.Control className="settings-input input" name="u_lastname" type="text" placeholder={u_info.u_lastname} disabled={!isInEditMode}
                    defaultValue={u_info.u_lastname}
                    onChange={(e) => {
                      u_info.u_lastname = e.target.value;
                    }}
                  />
                </Form.Group>
                {
                  u_info.u_role === "barber" && (
                    <>
                      <Form.Group className="inputGrp edit-form" controlId="formBasicLocation">
                        <Form.Label className='form-label'>Location</Form.Label>
                        <Form.Control style={{textTransform: "capitalize"}} className="settings-input input" name="u_location" type="text" placeholder={u_info.b_city} disabled={!isInEditMode}
                          defaultValue={b_city}
                          onChange={(e) => {
                            setB_city(e.target.value);
                          }}
                          />
                      </Form.Group>
                      <Form.Group className="inputGrp edit-form" controlId="formBasicShopName">
                        <Form.Label className='form-label'>Shop Name</Form.Label>
                        <Form.Control style={{textTransform: "capitalize"}} className="settings-input input" name="b_shop_name" type="text" placeholder={u_info.b_shop_name} disabled={!isInEditMode}
                          defaultValue={b_shop_name}
                          onChange={(e) => {
                            setB_shop_name(e.target.value);
                          }}
                          />
                      </Form.Group>
                    </>
                  )
                }
                <Form.Group className="inputGrp edit-form" controlId="formBasicPassword">
                  <Form.Label className='form-label'>Password</Form.Label>
                  <Form.Control className="settings-input input" name="u_password" type="password" placeholder="Password" disabled={!isInEditMode}
                    defaultValue={u_info.u_password}
                    onChange={(e) => {
                      u_info.u_password = e.target.value;
                    }}
                  />
                </Form.Group>
                <div className="settings-page__container__left__btns">
                  <button className="settings-page__container__left__btns__edit" onClick={() => {
                    if (isInEditMode) {
                      srUpdateUserInfo(u_info.u_id, {u_info:{
                        ...u_info,
                        b_city: b_city,
                        b_shop_name: b_shop_name,
                      }}).then((res) => {
                        if (res) {
                          setU_info({
                            ...u_info,
                            b_city: b_city,
                            b_shop_name: b_shop_name,
                          });
                          toast.success("Profile updated successfully!", {
                            position: "top-center",
                          });
                        }
                      });
                    }
                    setIsInEditMode(!isInEditMode);
                  }}>
                    {isInEditMode ? 'Save' : 'Edit'}
                  </button>
                  { isInEditMode &&
                    <button className="settings-page__container__left__btns__cancel" onClick={()=>{
                      window.location.reload();
                      setIsInEditMode(false);
                    }}>
                      Cancel
                    </button>
                  }
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
};