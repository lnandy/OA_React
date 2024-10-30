import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

const App: React.FC = () => (
	<Flex align="center" gap="middle" style={{
		position: 'fixed', width: '100%', height: ' 100%',
		zIndex: 1,
		opacity: '0.8', top: 0,
		backgroundColor: '#000', justifyContent: 'center'
	}}>
		<Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
	</Flex>
);

export default App;