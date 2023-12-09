import {addDoc, collection} from 'firebase/firestore';
import database from './database';

export const savePolicy = async data => {
  try {
    await addDoc(collection(database, 'policies-by-user'), {
      ...data,
    });
  } catch (error) {
    console.error(error);
  }
};
