import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Logout = () => {
  const { logout } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      await logout();
      navigate('/login');
    };
    doLogout();
  }, [logout, navigate]);

  return null;
};

export default Logout;
