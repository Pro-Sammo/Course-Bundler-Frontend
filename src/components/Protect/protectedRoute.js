import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({ children, isAutenticated, redirect }) => {
  return isAutenticated ? children : <Navigate to={redirect} replace />;
};

export default ProtectedRoute;
