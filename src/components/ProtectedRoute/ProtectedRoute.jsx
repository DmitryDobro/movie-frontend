import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({element: Component, ...props}) => {
  return props.isLoggin ? <Component {...props} /> : <Navigate to='/signin' replace />;
};

export default ProtectedRoute;
