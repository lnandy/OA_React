import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/api/firebase/firebase';
import { message } from 'antd';
const addTask = async (task) => {
	try {
		const docRef = await addDoc(collection(db, 'tasks'), task);
	} catch (e) {
		message.error(err.message);
	}
};

const getTasks = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, 'tasks'));
		return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	} catch (e) {
		message.error(err.message);
	}
};

const updateTask = async (id, updatedTask) => {
	try {
		const taskDoc = doc(db, 'tasks', id);
		await updateDoc(taskDoc, updatedTask);
	} catch (e) {
		message.error(err.message);
	}
};

const deleteTask = async (id) => {
	try {
		const taskDoc = doc(db, 'tasks', id);
		await deleteDoc(taskDoc);
	} catch (e) {
		message.error(err.message);
	}
};

export { addTask, getTasks, updateTask, deleteTask };
