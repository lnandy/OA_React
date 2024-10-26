import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useUser } from '@/api/user/UserContext';
import { ConfigProvider, theme, message, Layout, Menu, Card, Switch } from 'antd';

const { Header, Content, Footer } = Layout;


interface RouteType {
	label: string;
	path: string;
	element: React.LazyExoticComponent<React.ComponentType<any>>;
}
  
  interface AppcontainerProps {
	routes: RouteType[];
  }
const AppContainer : React.FC<AppcontainerProps> = ({ routes })  => {
	const { userInfo } = useUser();
	const [messageApi, contextHolder] = message.useMessage();
	const [themeType, setthemeType] = useState("dark");
	const changeTheme = (value: boolean) => {
		setthemeType(value ? 'light' : 'dark');
	};
	useEffect(() => {
		if (userInfo) {
			messageApi.info(`Hello, ${userInfo.username}`);
		}
	}, [userInfo, messageApi]);
	const items = routes.map((_route,index) => ({
		key: _route.path,
		label: _route.label,
	}));

	const handleClick = (e: { key: any; }) => {
		alert(`You clicked on ${e.key}`);
	};
	return (
		<ConfigProvider
			theme={{
				algorithm:
					themeType === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
			}}
		>
			{contextHolder}
			<Layout style={{ height: "100vh" }}>
				<Header style={{ display: 'flex', alignItems: 'center', lineHeight: '42px', background: themeType === "light" ? "#001529":"#141414"}}>
					<div className="demo-logo" />
					<Menu
						theme={themeType === "light" ? "dark" : "light"}
						mode="horizontal"
						selectable={false}
						items={items}
						style={{ flex: 1, minWidth: 0, border: 0 }}
						onClick={handleClick}
					/>
					<Switch
						checked={themeType === 'light'}
						onChange={changeTheme}
						checkedChildren="Light"
						unCheckedChildren="Dark"
					/>
				</Header>
				<Content style={{ height: '100%', padding: '1vh 2vh 0 2vh' }}>
					<Card
						style={{ height: '100%' }}
						title="Dashboard"
					>
						<Outlet />
					</Card>
				</Content>
				<Footer style={{ textAlign: 'center',padding:'1vh 2vh' }}>
					Ant Design ©{new Date().getFullYear()} Created by Ant UED
				</Footer>
			</Layout>
		</ConfigProvider>
	);
};

export default AppContainer;
