import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import bookBarberLogo from '../../assets/images/book barber.png'
import { createUser } from "../../service/srUser"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signupPage.css'

export const SignupPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  let isBarber = null;
  if (location.state) {
    isBarber = location.state.isBarber
  }

  const [userInfo, setUserInfo] = useState({
    u_firstname: '',
    u_lastname: '',
    u_email: '',
    u_password: '',
    u_cPassword: '',
    u_role: isBarber ? 'barber' : 'customer',
    b_city: '',
    b_shop_name: '',
  });

  const onInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const checkIfPasswordsMatch = () => {
    if (userInfo.u_password !== userInfo.u_cPassword) {
      toast.error('Passwords do not match !', {
        position: toast.POSITION.TOP_CENTER
      })
      return false
    }
    return true
  }

  const onSignupFormSubmit = (res) => {
    if (!res) {
      toast.error('Email Already Exists !', {
        position: toast.POSITION.TOP_CENTER
      })
    }
    else if (res.data.u_role === "barber") {
      navigate("/barber-dashboard", { state: { u_email: userInfo.u_email } })
    }
    else if (res.data.u_role === "customer") {
      navigate('/customer-dashboard', { state: { u_email: userInfo.u_email } })
    }
  }

  return (
    <>
      <div className="container"
        style={{
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="signupForm">
          <h4 className="title">
            {
              isBarber && isBarber === true ? "Barber " : "Customer "
            }
            Signup
          </h4>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (checkIfPasswordsMatch()) {
                createUser(userInfo).then((res) => {
                  onSignupFormSubmit(res)
                })
              }
            }}
          >
            <Form.Group className="inputGrp" controlId="formBasicFName">
              <Form.Control className="input" type="text" required placeholder="Enter First Name" name='u_firstname'
                value={userInfo.u_firstname}
                onChange={onInputChange}
              />
            </Form.Group>
            <Form.Group className="inputGrp" controlId="formBasicLName">
              <Form.Control className="input" type="text" required placeholder="Enter Last Name" name='u_lastname'
                value={userInfo.u_lastname}
                onChange={onInputChange}
              />
            </Form.Group>
            {
              isBarber && isBarber === true && (
                <>
                  <Form.Group className="inputGrp" controlId="formBasicShopName">
                    <Form.Control className="input" type="text" required placeholder="Enter Shop Name" name='b_shop_name'
                      value={userInfo.b_shop_name}
                      onChange={onInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="inputGrp" controlId="formBasiclocation">
                    <Form.Control className="input" type="text" required placeholder="Enter Shop Location" name='b_city'
                      value={userInfo.b_city}
                      onChange={onInputChange}
                      />
                  </Form.Group>
                </>
              )
            }
            <Form.Group className="inputGrp" controlId="formBasicEmail">
              <Form.Control className="input" type="email" required placeholder="Enter email" name='u_email'
                value={userInfo.u_email}
                onChange={onInputChange}
              />
            </Form.Group>
            <Form.Group className="inputGrp" controlId="formBasicPassword">
              <Form.Control className="input" type="password" required placeholder="Enter Password" name='u_password'
                value={userInfo.u_password}
                onChange={onInputChange}
              />
            </Form.Group>
            <Form.Group className="inputGrp" controlId="formBasicConfirmPassword">
              <Form.Control className="input" type="password" required placeholder="Confirm Password" name='u_cPassword'
                value={userInfo.u_cPassword}
                onChange={onInputChange}
              />
            </Form.Group>
            <Button className="signupButton" variant="primary" type="submit"
              style={{
                marginTop: isBarber && isBarber === true ? "0px" : "20px",
              }}
            >
              Submit
            </Button>
            <p>Already Have an Account? <Link className="loginLink" to="/login" state={{isBarber}}>Login</Link></p>
          </Form>
        </div>
        <div className="bookBarberLogo">
          <img src={bookBarberLogo} alt="book barber logo" />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}