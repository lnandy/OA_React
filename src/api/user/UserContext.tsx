import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserInfo {
	uid: string;
	username: string;
	email: string;
	role: string;
}

interface UserContextProps {
	userInfo: UserInfo | null;
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

	return (
		<UserContext.Provider value={{ userInfo, setUserInfo }}>
			{children}
		</UserContext.Provider>
	);
};

const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

export { UserProvider, useUser };
