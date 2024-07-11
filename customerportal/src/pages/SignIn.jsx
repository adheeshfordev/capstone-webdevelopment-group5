import React, { useLayoutEffect, useState } from 'react'
import Header from '../components/Header.jsx'

export default function SignIn() {

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [signinData, setSigninData] = useState(null);

    const onChangeData =(event)=>{
        setSigninData({
            ...signinData,
            [event.target.id]: event.target.value
    })
    
    }

    const submitForm = async (evt) => {
        evt.preventDefault();
        
        try {
            console.log(signinData);
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(signinData)
                    });

            const data = await response.json();
            console.log(data);
            setError(data.error);
            setSuccess("Logged In Successfully");
        }catch(error){
            setSuccess(null);
            console.log(error);
            setError(error);
        }

    }

//    console.log(signinData);
//    console.log(success);
//    console.log(error);

  return (
    <> 
    <Header />
        <div className="container">
            <h1 className="title">
                <span className="text-muted">Sign-</span>
                <span className="text-dark">In</span>
            </h1>
            <form className="form" onSubmit={submitForm}>
                <input type="text" placeholder="email" id="email" className="input" onChange={onChangeData}/>
                <input type="password" placeholder="password" id="password" className="input" onChange={onChangeData}/>
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
