import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'simple-todos-react.firebaseapp.com',
  projectId: 'simple-todos-react',
  storageBucket: 'simple-todos-react.appspot.com',
  messagingSenderId: '229628358932',
  appId: '1:229628358932:web:acc54da316f42b90981201',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
