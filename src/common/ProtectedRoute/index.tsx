import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@/api/user/UserContext';
const useAuth = () => {
  const { userInfo } = useUser();
  //const userInfo = { username: false }; 
  return userInfo && userInfo.username;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;