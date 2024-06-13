import React, { useState } from 'react'

export default function SignUp() {
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
  return (
    <> 
        <div className="container">
            <h1 className="title">
                <span className="text-muted">Sign-</span>
                <span className="text-dark">Up</span>
            </h1>
            <form className="form">
                <input type="text" placeholder="username" id="username" className="input" />
                <input type="text" placeholder="email" id="email" className="input" />
                <input type="text" placeholder="name" id="name" className="input" />
                <input type="text" placeholder="password" id="password" className="input" />
                <div className="button-container">
                    <button className="button">Sign-Up</button>
                </div>
                <div className="link-container">
                    <p>Already have an account?</p>
                    <a href="/signin" className="link">Sign-In</a>
                </div>
            
            </form>
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='.success-message'>{success}</p>}
        </div>
    </>
  )
}
