import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import bookBarberLogo from '../../assets/images/book barber.png'
import { createUser } from "../../service/srUser"
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
    u_role: isBarber ? 'barber' : 'customer'
  });

  const onInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const checkIfPasswordsMatch = () => {
    if (userInfo.u_password !== userInfo.u_cPassword) {
      alert("Passwords do not match")
      return false
    }
    return true
  }

  const onSignupFormSubmit = (res) => {
    if (!res) {
      alert("Email Already Exists")
    }
    else if (res.data.u_role === "barber") {
      navigate('/barber-dashboard')
    }
    else if (res.data.u_role === "customer") {
      navigate('/customer-dashboard')
    }
  }

  return (
    <>
      <div className="container">
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
            <Button className="signupButton" variant="primary" type="submit">
              Submit
            </Button>
            <p>Already Have an Account? <Link className="loginLink" to="/login" state={{isBarber}}>Login</Link></p>
          </Form>
        </div>
        <div className="bookBarberLogo">
          <img src={bookBarberLogo} alt="book barber logo" />
        </div>
      </div>
    </>
  )
}