Import { useSelector } from 'react-redux';
Import { useEffect, useContext } from 'react';
Import { UserContext } from 'contexts/UserContext';
Import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const account = useSelector((state) => state.account);
  const { isUserLoaded } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isUserLoaded && !account.user) {
      navigate('/login');
      return;
    }
  }, [account, navigate, isUserLoaded]);

  Return children;
};

Export default AuthGuard;