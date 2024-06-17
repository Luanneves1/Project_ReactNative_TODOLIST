import { initializeApp } from '@firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDcVu8QVZppukMPnVrAhsWVdt30wUbQC68",
    authDomain: "aplicativolistadetarefas-45de7.firebaseapp.com",
    projectId: "aplicativolistadetarefas-45de7",
    storageBucket: "aplicativolistadetarefas-45de7.appspot.com",
    messagingSenderId: "676354898818",
    appId: "1:676354898818:web:0d11fe390b8a51ee4ced9b"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;
