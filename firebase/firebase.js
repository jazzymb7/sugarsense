import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

import {
  API_KEY,
  AUTHDOMAIN,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID,
  APPID,
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
