import { Navigate, Outlet } from 'react-router-dom';
import { getLocalStorage } from '@/api/storage';

const useAuth = () => {
	const userInfo = getLocalStorage("userInfo");
	return userInfo && userInfo.email;
};

const ProtectedRoute = () => {
	const isAuth = useAuth();
	return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;