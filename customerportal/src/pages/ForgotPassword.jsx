import React, { useState } from 'react'
import Header from '../components/Header.jsx'

export default function ForgotPassword() {
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

  return (
    <>  
    <Header />
        <div className="container">
            <h1 className="title">
                <span className="text-muted">Forgot-</span>
                <span className="text-dark">Password</span>
            </h1>
            <form className="form">
                <p className="text-dark-forgot-password">
                    Please enter your associated email here:
                </p>
                <input type="text" placeholder="email@email.com" id="email" className="input" />
                <div className="button-container">
                    <button className="button">Send Email</button>
                </div>
            </form>
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='.success-message'>{success}</p>}
        </div>
    </>
  )
}
