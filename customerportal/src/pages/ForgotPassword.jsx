import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const onChangeData = (event) => {
        setEmail(event.target.value);
    };

    const submitForm = async (evt) => {
        evt.preventDefault();

        try {
            const response = await fetch('https://capstone-webdevelopment-group5-api.onrender.com/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (data.error) {
                setError(data.error);
                setSuccess(null);
            } else {
                setSuccess('Password reset link has been sent to your email');
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
                    <span className="text-muted">Forgot-</span>
                    <span className="text-dark">Password</span>
                </h1>
                <form className="form" onSubmit={submitForm}>
                    <p className="text-dark-forgot-password">
                        Please enter your associated email here:
                    </p>
                    <input type="text" placeholder="email@email.com" id="email" className="input" onChange={onChangeData} />
                    <div className="button-container">
                        <button type="submit" className="button">Send Email</button>
                    </div>
                </form>
                {error && <p className='error-message'>{error}</p>}
                {success && <p className='success-message'>{success}</p>}
            </div>
            <Footer />
        </>
    );
}
