import React, { Suspense, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/common/Login/index';
import Appcontainer from '@/common/Appcontainer';
import ProtectedRoute from '@/common/ProtectedRoute';
import NotFound from '@/common/404';
import Loading from '@/common/Loading';
import { useUser } from '@/api/user/UserContext';
import { getLocalStorage } from '@/api/storage';
import { useLoading } from '@/common/Loading/loadingContext'; // 导入 useLoading
import { db } from '@/api/firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

import Example from "@/components/example"


interface RouteType {
	id: string;
	label: string;
	path: string;
	parent: string;
	role: string;
	element?: React.LazyExoticComponent<React.ComponentType<any>>;
}

const App: React.FC = () => {
	const [routes, setRoutes] = useState<RouteType[]>([]);
	const [isUserInfoInitialized, setIsUserInfoInitialized] = useState(false);
	const { userInfo, setUserInfo } = useUser();
	const userInfoStorage = getLocalStorage("userInfo");
	const { isLoading,setLoading } = useLoading(); // 使用 useLoading 钩子

	useEffect(() => {
		if (!userInfo && !!userInfoStorage && isUserInfoInitialized) {
			setUserInfo(userInfoStorage);
		}
		setIsUserInfoInitialized(true);
	}, [userInfo, userInfoStorage]);

	useEffect(() => {
		console.log("routes changed"+routes);
	}, [routes]);

	useEffect(() => {
		//   const response = await fetch();
		//   const fetchedRoutes: RouteType[] = response.filter((item: RouteType) => item.role.includes(userInfo?.role ?? ''))
		//     .map((item: RouteType) => {
		//       return {
		//         path: `/${item.path}`,
		//         label: item.label,
		//         parent: item.parent,
		//         role: item.role,
		//         element: item.element ? React.lazy(() => {
		//           return Promise.all([
		//             import(/* webpackChunkName: "[request]" */`./${item.element}index`),
		//             new Promise(resolve => setTimeout(resolve, 300))
		//           ])
		//             .then(([moduleExports]) => moduleExports);
		//         }) : null
		//       };
		//     });
		//   console.log(fetchedRoutes)
		const fetchData = async () => {
			const q = query(collection(db, 'routes'), where('role', 'array-contains', userInfo?.role));
			const querySnapshot = await getDocs(q);
			const fetchedRoutes = querySnapshot.docs.map(doc => {
				const data = doc.data();
				return {
					id: doc.id,
					label: data.label,
					path: data.path,
					parent: data.parent,
					role: data.role,
					element: data.element ? React.lazy(() => {
						if(data.path === "dashboard"){
							return import(/* webpackChunkName: "[request]" */`./${data.element}index`);
						}else{
							return Promise.all([
								import(/* webpackChunkName: "[request]" */`./${data.element}index`),
								new Promise(resolve => setTimeout(resolve, 300))
							])
							.then(([moduleExports]) => moduleExports);
						}
					}) : undefined
				};
			});
			setRoutes(fetchedRoutes);
		};
		if (userInfo) {
			fetchData();	
		}
	}, [userInfo]);

	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/" element={<ProtectedRoute />}>
						<Route index element={<Navigate to="/dashboard" />} />
						<Route element={<Appcontainer routes={routes} />} >
							{routes.map(({ path, element: Element }) => (
								Element ? <Route key={path} path={path} element={<Element />} /> : null
							))}
						</Route>
					</Route>
					{routes.length > 0 && <Route path="*" element={<NotFound />} />}
				</Routes>
			</Suspense>
			{isLoading && <Loading />} {/* 全局 Loading 层 */}
		</Router>
	);
};

export default App;
