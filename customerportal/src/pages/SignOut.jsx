import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function SignOut() {
    const navigate = useNavigate();

    useEffect(() => {
        Cookies.remove('token');
        navigate('/signin');
    }, [navigate]);

    return null;
}
