import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile({ user }) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [profileData, setProfileData] = useState({
        email: user?.email || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
    });

    const [file, setFile] = useState(null);
    const fileRef = useRef(null);

    const onChangeData = (event) => {
        setProfileData({
            ...profileData,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`http://localhost:3000/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`, // Adjust based on your auth method
                },
                body: JSON.stringify(profileData),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const result = await response.json();
            setSuccess('Profile updated successfully');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="profile-container">
                <h1 className="profile-title">
                    <span className="profile-text-muted">USER-</span>
                    <span className="profile-text-dark">PROFILE</span>
                </h1>
                <form className="profile-form" onSubmit={handleSubmit}>
                    <div className='profile-flex profile-flex-col profile-justify-center profile-text-center'>
                        <input type='file' ref={fileRef} onChange={(e) => { setFile(e.target.files[0]) }} hidden accept='image/*' />
                        <span className='profile-text-gray-800 profile-mt-2 profile-mb-4 profile-underline profile-font-bold'>{user ? user.username : 'Loading...'}</span>
                    </div>

                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        className="profile-input"
                        value={profileData.email}
                        onChange={onChangeData}
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        id="firstName"
                        className="profile-input"
                        value={profileData.firstName}
                        onChange={onChangeData}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        id="lastName"
                        className="profile-input"
                        value={profileData.lastName}
                        onChange={onChangeData}
                    />
                    <div className="profile-button-container">
                        <button className="profile-button" type="submit">UPDATE</button>
                    </div>
                </form>
                {error && <p className='profile-error-message'>{error}</p>}
                {success && <p className='profile-success-message'>{success}</p>}
            </div>
            <Footer />
        </>
    );
}
