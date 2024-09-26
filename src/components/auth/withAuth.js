import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
      if (!token) {
        navigate('/login'); // Перенаправление через useNavigate
      }
    }, [token, navigate]);

    return token ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
