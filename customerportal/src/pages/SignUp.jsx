import React, { useState } from 'react'
import Header from '../components/Header.jsx'

export default function SignUp() {
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const [signUpData, setSignUpData] = useState(null);

    const onChangeData =(event)=>{
        setSignUpData({
            ...signUpData,
            [event.target.id]: event.target.value
        })
    }

    const submitForm = async (evt) => {
        evt.preventDefault();
        
        try {
            console.log(signUpData);
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(signUpData)
                    });

            const data = await response.json();
            console.log(data);
            setError(data.error);
            setSuccess(data.message);
        }catch(error){
            setSuccess(null);
            console.log(error);
            setError(error);
        }

    }

    // console.log(signUpData);


  return (
    <> 
    <Header />
        <div className="container">
            <h1 className="title">
                <span className="text-muted">Sign-</span>
                <span className="text-dark">Up</span>
            </h1>
            <form className="form" onSubmit={submitForm}>
                <input type="text" placeholder="email" id="email" className="input" onChange={onChangeData}/>
                <input type="text" placeholder="firstName" id="firstName" className="input" onChange={onChangeData}/>
                <input type="text" placeholder="lastName" id="lastName" className="input" onChange={onChangeData}/>
                <input type="password" placeholder="password" id="password" className="input" onChange={onChangeData}/>
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
