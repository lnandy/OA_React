import React, { Suspense,useEffect,useState  } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '@/common/Login/index';
import Appcontainer from '@/common/Appcontainer';
import ProtectedRoute from '@/common/ProtectedRoute';
import NotFound from '@/common/404';
import { UserProvider } from '@/api/user/UserContext';
import { fetch } from '@/api/route/Api';
import {setSessionStorage,getSessionStorage} from '@/api/storage';

interface RouteType {
	label: string;
	path: string;
	element: React.LazyExoticComponent<React.ComponentType<any>>;
}

const App : React.FC = () => {
	const [routes, setRoutes] = useState<RouteType[]>([]);
	useEffect(() => {
		// 在组件初始化时执行的方法
		const fetchData = async () => {
			const response = await fetch();
			const fetchedRoutes: RouteType[] = response.map( (item: { path: any; element: string;label: string }) => {
				console.log(item)
				return {
				  path: `/${item.path}`,
				  label: item.label,
				  element: React.lazy(() => import(/* webpackChunkName: "[request]" */`./${item.element}index`))
				};
			  });
			  setRoutes(fetchedRoutes);
		};
		fetchData();
		window.setSessionStorage = setSessionStorage;
        window.getSessionStorage = getSessionStorage;
	}, []); // 空数组作为依赖项，确保只在组件挂载时执行一次
	
	return (
		<UserProvider>
			<Router>
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/"  element={<ProtectedRoute />}>
							<Route element={<Appcontainer routes={routes}/>} >
								{routes.map(({ path, element: Element }) => (
									<Route key={path} path={path} element={<Element />} />
								))}
							</Route>
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</Router>
		</UserProvider>
	)
};

export default App;