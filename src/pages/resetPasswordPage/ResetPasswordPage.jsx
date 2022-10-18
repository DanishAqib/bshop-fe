import React, { useState } from 'react';  
import { useNavigate } from "react-router-dom"
import { srUpdateUserPassword } from '../../service/srUser';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import bookBarberLogo from '../../assets/images/book barber.png'
import './resetPasswordPage.css'

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    u_email: '',
    u_password: '',
    u_cPassword: ''
  })

  const onInputChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value
    })
  }

  const checkIfPasswordsMatch = () => {
    if (userCredentials.u_password !== userCredentials.u_cPassword) {
      alert("Passwords do not match")
      return false
    }
    return true
  }

  const onResetPasswordFormSubmit = (res) => {
    if(!res){
      alert("Email does not exist")
    }
    else {
      alert("Password updated successfully")
      navigate(-1);
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
        <div className="resetPasswordForm">
          <h4 className="title">Reset Password</h4>
          <Form 
            onSubmit={(e) => {
              e.preventDefault();
              if (checkIfPasswordsMatch()) {
                srUpdateUserPassword(userCredentials.u_email, userCredentials.u_password)
                  .then(res => onResetPasswordFormSubmit(res))
                }
              }}
            >
            <Form.Group className="inputGrp" controlId="formBasicEmail">
              <Form.Control className="input" name="u_email" required type="email" placeholder="Enter email" value={userCredentials.u_email}
                onChange={onInputChange}
              />
            </Form.Group>
            <Form.Group className="inputGrp" controlId="formBasicPassword">
              <Form.Control className="input" name="u_password" required type="password" placeholder="New Password" value={userCredentials.u_password}
                onChange={onInputChange}
              />
            </Form.Group>
            <Form.Group className="inputGrp" controlId="formBasicPassword">
              <Form.Control className="input" name="u_cPassword" required type="password" placeholder="Confirm New Password" value={userCredentials.u_cPassword}
                onChange={onInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Reset Password
            </Button>
          </Form>
        </div>
        <div className="bookBarberLogo">
          <img src={bookBarberLogo} alt="book barber logo" />
        </div>
      </div>
    </>
  )
};