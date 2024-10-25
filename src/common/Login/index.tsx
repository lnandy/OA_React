import './login.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import { useUser } from '@/api/user/UserContext';
import { login } from '@/api/user/Api';

type FieldType = {
	username?: string;
	password?: string;
	remember?: string;
};


const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
	console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
	console.log("Login page");
	const navigate = useNavigate();
	const { setUserInfo } = useUser();
	const onFinish: FormProps<FieldType>['onFinish'] = async (formData) => {
		try {
			const response = await login(formData);
			if (response.length === 0) {
				message.error('UserName or Password not exist.');
			} else {
				response.find((item: FieldType) => {
					return item.username === formData.username;
				})
				setUserInfo(response[0]);
				navigate('/dashboard');
			}
			// 处理登录成功后的逻辑，例如保存用户信息或跳转页面
		} catch (err) {
			message.error('Looks like face some error, please try again.');
		}
	};

	return (
		<div className='loginContainer' >
			<div className="loginStage">
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					// wrapperCol={{ span: 16 }}
					style={{ maxWidth: 400 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item<FieldType>
						name="username"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input placeholder="Username" />
					</Form.Item>

					<Form.Item<FieldType>
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password placeholder="Password" />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" className="sign">
							SIGN IN
						</Button>
					</Form.Item>

					<Form.Item>
						<Flex justify="space-between">
							<Form.Item<FieldType>
								name="remember"
								valuePropName="checked"
							>
								<Checkbox>Remember me</Checkbox>
							</Form.Item>
							<Button color="default" variant="link">
								Forget
							</Button>
							<Button color="default" variant="link">
								Register
							</Button>
						</Flex>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
export default Login;