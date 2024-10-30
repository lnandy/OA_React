import './login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import { useUser } from '@/api/user/UserContext';
import { setLocalStorage } from '@/api/storage';
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@/api/firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useLoading } from '@/common/Loading/loadingContext';

type FieldType = {
	email?: string;
	password?: string;
	remember?: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
	console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
	const navigate = useNavigate();
	const { setUserInfo } = useUser();
	const { setLoading } = useLoading();
	const [isregister, setIsRegister] = useState<boolean>(false);
	const onFinish: FormProps<FieldType>['onFinish'] = async (formData) => {
		try {
			if (!!formData.email && !!formData.password) {
				setLoading(true);
				if (isregister) {
					const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
					const user = userCredential.user;
					await setDoc(doc(db, 'users', user.uid), {
						email: user.email,
						role: 'user' // 默认角色为普通用户
					});
					setIsRegister(!isregister);
					message.success('Registration successful!');
					setLoading(false);
				} else {
					const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
					const user = userCredential.user;
					const userDoc = await getDoc(doc(db, 'users', user.uid));
					if (userDoc.exists()) {
						const userData = userDoc.data();
						const completeUserData = {
							uid: user.uid,
							email: userData.email || '',
							role: userData.role || '',
							username: userData.username || ''
						  };
						setUserInfo(completeUserData);
						setLocalStorage("userInfo", userData, 4);
						setTimeout(() => {
							navigate('/dashboard');
							setLoading(false);
						}, 0);
					}
					
				}
			}

		} catch (err) {
			message.error((err as Error).message);
			setLoading(false);
		}
	};
	const rigister: any = () => {
		setIsRegister(!isregister);
	}
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
						name="email"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input placeholder="Email" />
					</Form.Item>

					<Form.Item<FieldType>
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password placeholder="Password" />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" className="sign">
							{isregister ? "Register" : "SIGN IN"}
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
							<Button color="default" variant="link" onClick={() => { rigister() }}>
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