import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile({ user }) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [signinData, setSigninData] = useState(null);

    const [file, setFile] = useState(null);
    const fileRef = useRef(null);

    const onChangeData = (event) => {
        setSigninData({
            ...signinData,
            [event.target.id]: event.target.value
        });
    }

    return (
        <>
            <Header />
            <div className="profile-container">
                <h1 className="profile-title">
                    <span className="profile-text-muted">USER-</span>
                    <span className="profile-text-dark">PROFILE</span>
                </h1>
                {/* SUbmit form */}
                <form className="profile-form">
                <div className='profile-flex profile-flex-col profile-justify-center profile-text-center'>
                    <input type='file' ref={fileRef} onChange={(e) => { setFile(e.target.files[0]) }} hidden accept='image/*' />
                    {/* <img src={user.user.avatar} onClick={() => { fileRef.current.click(); console.log(fileRef) }} alt='profile' className='profile-rounded-full profile-h-24 profile-w-24 profile-object-cover profile-cursor-pointer profile-self-center profile-mt-2' /> */}
                    <span className='profile-text-gray-800 profile-mt-2 profile-mb-4 profile-underline profile-font-bold'>{user ? user.user.username : 'Loading...'}</span>
                </div>

                    <input type="text" placeholder="email" id="email" className="profile-input" onChange={onChangeData} />
                    {/* <input type="text" placeholder="type" id="type" className="profile-input" onChange={onChangeData} /> */}
                    <input type="text" placeholder="firstName" id="firstName" className="profile-input" onChange={onChangeData} />
                    <input type="text" placeholder="lastName" id="lastName" className="profile-input" onChange={onChangeData} />
                    <div className="profile-button-container">
                        <button className="profile-button">UPDATE</button>
                    </div>
                </form>
                {error && <p className='profile-error-message'>{error}</p>}
                {success && <p className='profile-success-message'>{success}</p>}
            </div>
            <Footer/>
        </>
    )
}
