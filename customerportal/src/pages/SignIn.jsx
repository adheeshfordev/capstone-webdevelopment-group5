import React, { useState } from 'react'

export default function SignIn() {

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
  return (
    <> 
        <div className="container">
            <h1 className="title">
                <span className="text-muted">Sign-</span>
                <span className="text-dark">In</span>
            </h1>
            <form className="form">
                <input type="text" placeholder="username" id="username" className="input" />
                <input type="text" placeholder="password" id="password" className="input" />
                <div className="button-container">
                    <button className="button">Sign-In</button>
                </div>
                <div className="link-container">
                    <p>Forgot Password?</p>
                    <a href="/forgotpassword" className="link">Click here</a>
                </div>
                <div className="signup-container">
                    <p>Don't have an account?</p>
                    <a href="/signup" className="link">Sign-Up</a>
                </div>
            </form>
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='.success-message'>{success}</p>}
        </div>
    </>
  )
}
