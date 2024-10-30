import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useUser } from '@/api/user/UserContext';
import { ConfigProvider, theme, message, Layout, Menu, Card, Switch, Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { setLocalStorage,getLocalStorage } from '@/api/storage';


const { Header, Content, Footer } = Layout;
interface RouteType {
	label: string;
	path: string;
	parent: string;
}
interface AppcontainerProps {
	routes: RouteType[];
}
interface MenuItem {
	key: string;
	label: string;
	children?: MenuItem[];
}
const AppContainer: React.FC<AppcontainerProps> = ({ routes }) => {
	console.log('AppContainer');
	const navigate = useNavigate();
	const location = useLocation();
	const { userInfo,setUserInfo } = useUser();
	const [loadings, setLoadings] = useState<boolean>();
	const [messageApi, contextHolder] = message.useMessage();
	const [themeType, setThemeType] = useState<string>(() => {
		const storedTheme = getLocalStorage("themeType");
		return storedTheme ? storedTheme : "dark";
	});
	const [activeMenu, setActiveMenu] = useState<RouteType | undefined>({'path':"/dashboard",label:"Dashboard",parent: ""});
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const changeTheme = (value: boolean) => {
		setThemeType(value ? 'light' : 'dark');
		setLocalStorage("themeType",value ? 'light' : 'dark');
	};
	useEffect(() => {
		if (userInfo) {
			messageApi.info(`Hello, ${userInfo.username}`);
		}
	}, [userInfo, messageApi]);

	useEffect(() => {
		const items: MenuItem[] = routes
			.filter(route => !route.parent) // Only top-level routes
			.map(route => {
				const temp: MenuItem = {
					key: route.path,
					label: route.label,
				};
				const children: MenuItem[] = routes
					.filter(child => child.parent === route.label)
					.map(child => ({
						key: child.path,
						label: child.label,
					}));
				if (children.length > 0) {
					temp.children = children;
				}
				return temp;
			});
		setMenuItems(items);
		const currentItem = routes.find(item => item.path === location.pathname);
		if (currentItem) {
			setActiveMenu(currentItem);
		}
	}, [routes,location.pathname]);

	const handleClick = (info: any) => {
		const item:RouteType | undefined = routes.find(menuItem => menuItem.path === info.key);
		if (item) {
			setActiveMenu(item);
			navigate(item.path);
		}
	};
	const logout = () => {
		setLoadings(true);
		setTimeout(() => {
			setLoadings(false);
			setLocalStorage('userInfo',"");
			setUserInfo(null);
		}, 1000);
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
				<Header style={{ display: 'flex', alignItems: 'center', lineHeight: '4vh',padding:"1vh", background: themeType === "light" ? "#001529" : "#141414" }}>
					<Menu
						theme={themeType === "light" ? "dark" : "light"}
						mode="horizontal"
						selectable={false}
						items={menuItems}
						style={{ flex: 1, minWidth: 0, border: 0 }}
						onClick={handleClick}
					/>
					<Switch
						checked={themeType === 'light'}
						onChange={changeTheme}
						checkedChildren="Light"
						unCheckedChildren="Dark"
					/>
					<Button
						color="default" variant="outlined" shape="circle"
						icon={<PoweroffOutlined />}
						loading={loadings}
						style={{margin:"0 1vh"}}
						onClick={() => logout()}
					/>
				</Header>
				<Content style={{ height: '100%', padding: '1vh 2vh 0 2vh' }}>
					<Card
						style={{ height: '100%' }}
						title={activeMenu?.label}
					>
						<Outlet />
					</Card>
				</Content>
				<Footer style={{ textAlign: 'center', padding: '1vh 2vh' }}>
					Ant Design ©{new Date().getFullYear()} Created by Ant UED
				</Footer>
			</Layout>
		</ConfigProvider>
	);
};

export default AppContainer;
