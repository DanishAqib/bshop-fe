import React, { useState } from 'react';  
import { Link, useLocation, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import bookBarberLogo from '../../assets/images/book barber.png'
import { validateUser } from "../../service/srUser"
import './loginPage.css'

export const LoginPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  let isBarber = null;
  if (location.state) {
    isBarber = location.state.isBarber
  }
  const [userCredentials, setUserCredentials] = useState({
    u_email: '',
    u_password: ''
  })
  
  const onInputChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value
    })
  }

  const onLoginFormSubmit = (res) => {
    if (!res) {
      alert("Invalid Credentials")
    }
    else if (res === "barber") {
      navigate("/barber-dashboard", { state: { u_email: userCredentials.u_email } })
    }
    else if (res === "customer") {
      navigate('/customer-dashboard', { state: { u_email: userCredentials.u_email } })
    }
  }

  return (
    <>
      <div className="container">
        <div className="loginForm">
          <h4 className="title">
            {
              isBarber && isBarber === true ? "Barber " : "Customer "
            }
            Login
          </h4>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validateUser(userCredentials).then((res) => {
                onLoginFormSubmit(res)
              })
            }}
          >
            <Form.Group className="inputGrp" controlId="formBasicEmail">
              <Form.Control className="input" name='u_email' type="email" required placeholder="Enter email" value={userCredentials.u_email}
                onChange={onInputChange}
              />
            </Form.Group>
            <Form.Group className="inputGrp" controlId="formBasicPassword">
              <Form.Control className="input" name="u_password" type="password" required placeholder="Enter Password" value={userCredentials.u_password}
                onChange={onInputChange}
              />
            </Form.Group>
            <Button className="loginButton" variant="primary" type="submit">
              Submit
            </Button>
            <p>Don't Have an Account? <Link className="signupLink" to="/signup" state={{isBarber}}>SignUp</Link></p>
          </Form>
        </div>
        <div className="bookBarberLogo">
          <img src={bookBarberLogo} alt="book barber logo" />
        </div>
      </div>
    </>
  )
}