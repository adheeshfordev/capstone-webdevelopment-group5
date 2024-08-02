import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

export default function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const onChangeData = (event) => {
        setPassword(event.target.value);
    };

    const submitForm = async (evt) => {
        evt.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword: password }),
            });

            const data = await response.json();
            if (data.error) {
                setError(data.error);
                setSuccess(null);
            } else {
                setSuccess('Password has been reset successfully');
                setError(null);
            }
        } catch (error) {
            setError(error.message || 'An error occurred');
            setSuccess(null);
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <h1 className="title">
                    <span className="text-dark">Reset Password</span>
                </h1>
                <form className="form" onSubmit={submitForm}>
                    <p className="text-dark-reset-password">
                        Please enter your new password:
                    </p>
                    <input type="password" placeholder="New Password" id="password" className="input" onChange={onChangeData} />
                    <div className="button-container">
                        <button type="submit" className="button">Reset Password</button>
                    </div>
                </form>
                {error && <p className='error-message'>{error}</p>}
                {success && <p className='success-message'>{success}</p>}
            </div>
            <Footer/>
        </>
    );
}
