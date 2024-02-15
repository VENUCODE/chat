// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyBT9rE6MVCzfwzUhQtBq4TbfuK6yJisa-M',
  authDomain: 'vchat-ce52a.firebaseapp.com',
  databaseURL: 'https://vchat-ce52a-default-rtdb.firebaseio.com',
  projectId: 'vchat-ce52a',
  storageBucket: 'vchat-ce52a.appspot.com',
  messagingSenderId: '726826815268',
  appId: '1:726826815268:web:0a03b4462dde6e88506db1',
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
