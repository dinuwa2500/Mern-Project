import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const AdminRoute = ({ element }) => {
  const userState = useSelector((state) => state.user);

  if (!userState || !userState.userInfo?.token) {
    toast.error("You need to log in first");
    return <Navigate to="/login" />;
  }

  if (!userState.userInfo.admin) {
    toast.error("Access denied. Admins only");
    return <Navigate to="/" />;
  }

  return element;
};


export default AdminRoute;
