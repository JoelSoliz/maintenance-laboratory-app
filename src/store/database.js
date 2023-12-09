import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDqYCrq3C3hv1bBt4Pg3oFaaycJF2ShUNE',
  authDomain: 'maintenance-laboratory.firebaseapp.com',
  projectId: 'maintenance-laboratory',
  storageBucket: 'maintenance-laboratory.appspot.com',
  messagingSenderId: '561435921270',
  appId: '1:561435921270:web:2ba757b1f9372fc65d4857',
  measurementId: 'G-0ECFTMQNSM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;
