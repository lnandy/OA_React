import React, { useEffect, useState } from 'react';
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@/api/firebase/firebase';
import { doc, getDoc, setDoc, deleteDoc, DocumentData,addDoc,collection } from 'firebase/firestore';

const App: React.FC = () =>  {
  const [userInfo, setUserInfo] = useState<DocumentData | null>(null);
  const [var0, setVar0] = useState('');
  const [var1, setVar1] = useState('');
  const [var2, setVar2] = useState('');
  const [var3, setVar3] = useState('');
  const [var4, setVar4] = useState('');
  const [var5, setVar5] = useState('');
  const [var6, setVar6] = useState('');
  const [userId, setUserId] = useState<string | null>("NIjaBQgoALjZZtZLnyjI");
  const [error, setError] = useState<string | null>(null);

  // 创建用户
  // const handleSignUp = async () => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  //     setUserId(user.uid);
  //     await setDoc(doc(db, 'userinfo', user.uid), {
  //       email: user.email,
  //       createdAt: new Date()
  //     });
  //     console.log('User created:', user);
  //     setError(null); // 清除错误信息
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     setError((error as Error).message);
  //   }
  // };

  // // 登录用户
  // const handleSignIn = async () => {
  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  //     setUserId(user.uid);
  //     console.log('User signed in:', user);
  //     setError(null); // 清除错误信息
  //   } catch (error) {
  //     console.error('Error signing in:', error);
  //     setError((error as Error).message);
  //   }
  // };

  // 查询用户信息
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        const userRef = doc(db, 'userinfo', userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserInfo(userSnap.data());
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserInfo();
  }, [userId]);

  // 创建用户信息
  const createUserInfo = async () => {
    if (userId) {
      const userRef = doc(db, 'routes','A');
      await setDoc(userRef, {
        "path": "dashboard",
        "element": "components/dashboard/",
        "label": "Dashboard",
        "role": ['user','admin']
      });
      console.log('User info created');
    }
  };

  const addNewDocument = async () => {
    try {
      const docRef = await addDoc(collection(db, 'role'), {
        "username": "user",
        "role": "user"
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  // 更新用户信息
  const updateUserInfo = async () => {
    if (userId) {
      const userRef = doc(db, 'userinfo', userId);
      await setDoc(userRef, {
        name: 'Updated Name',
        email: 'updatedemail@example.com'
      });
      console.log('User info updated');
    }
  };

  // 删除用户信息
  const deleteUserInfo = async () => {
    if (userId) {
      const userRef = doc(db, 'userinfo', userId);
      await deleteDoc(userRef);
      console.log('User info deleted');
      setUserInfo(null); // 清空本地状态
    }
  };

  return (
    <div>
      <h1>Firebase Firestore CRUD Example</h1>
      table name : <input type="email" value={var0} onChange={(e) => setVar0(e.target.value)} placeholder="Email" /><br />
      <input type="email" value={var1} onChange={(e) => setVar1(e.target.value)} placeholder="Email" /><br />
      <input type="email" value={var2} onChange={(e) => setVar2(e.target.value)} placeholder="Email" /><br />
      <input type="email" value={var3} onChange={(e) => setVar3(e.target.value)} placeholder="Email" /><br />
      <input type="email" value={var4} onChange={(e) => setVar4(e.target.value)} placeholder="Email" /><br />
      <input type="email" value={var5} onChange={(e) => setVar5(e.target.value)} placeholder="Email" /><br />
      <input type="email" value={var6} onChange={(e) => setVar6(e.target.value)} placeholder="Email" /><br />
      {/* <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button> */}
      <button onClick={createUserInfo}>Create User Info</button>
      <button onClick={updateUserInfo}>Update User Info</button>
      <button onClick={deleteUserInfo}>Delete User Info</button>
      <button onClick={addNewDocument}>addNewDocument</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <pre>{JSON.stringify(userInfo, null, 2)}</pre>
    </div>
  );
}
export default App;