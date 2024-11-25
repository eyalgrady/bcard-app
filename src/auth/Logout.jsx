import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleTypes } from '../components/navbar/Navbar';
import { GeneralContext } from '../App';

const Logout = () => {
  const navigate = useNavigate();
  const { setUserRoleType } = useContext(GeneralContext);

  useEffect(() => {
    localStorage.removeItem('x-auth-token');
    navigate('/'); 
    setUserRoleType(RoleTypes.none);
  }, [navigate, setUserRoleType]);

    return null;
};

export default Logout;