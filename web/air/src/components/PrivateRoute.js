import { Navigate } from 'react-router-dom';

import { history } from '../helpers';


function PrivateRoute({ children }) {
  // If the user is not logged in, redirect to the login page
  if (!localStorage.getItem('user')) {
    return <Navigate to="/login" state={{ from: history.location }} />;
  }
  return children;
}

export { PrivateRoute };