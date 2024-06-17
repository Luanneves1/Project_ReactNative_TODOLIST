// firebaseUtils.js
import { initializeApp } from '@firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
    // Sua configuração do Firebase aqui...
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database, collection, addDoc, getDocs, deleteDoc, doc, updateDoc };
