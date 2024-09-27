//this file is for all helper functions
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db, FIREBASE_AUTH } from "../firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { DB_USERS, DB_SUGAR, DB_WEIGHT } from "@env";

//firebase authentication
const firebaseAuthentication = async (obj) => {
  try {
    if (obj.value === "signup") {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        obj.email,
        obj.password
      );
      const authenticatedUser = userCredential.user;
      console.log("authenticatedUsr", authenticatedUser);
      //send email verification
      const result = await sendEmailVerification(authenticatedUser);
      let { password, value, ...rest } = obj;
      let userdetails = {
        ...rest,
        id: authenticatedUser.uid,
      };
      AsyncStorage.setItem("userdetails", JSON.stringify(userdetails));
      return {
        status: "success",
        message: "Email verification send",
        value: false,
      };
    } else {
      const logincredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        obj.email,
        obj.password
      );
      const loginAuthUser = logincredential.user;
      if (loginAuthUser.emailVerified) {
        //TODO:write function to create the user in backend
        const result = await createUser(loginAuthUser);
        return { status: "success", message: result, value: "login" };
      } else {
        return { status: "error", message: "Email not verified" };
      }
    }
  } catch (error) {
    return { status: "error", message: error.mesage };
  }
};

//sign up (users collection)

//login

//logout
const firebaseLogout = async () => {
  try {
    await signOut(FIREBASE_AUTH);
    AsyncStorage.removeItem("userdetails");
    return true;
  } catch (error) {
    alert(error.message);
    return false;
  }
};

//check for existing user
const getUser = async (email) => {
  const userQuery = query(
    collection(db, DB_USERS),
    where("email", "==", email)
  );
  try {
    let querySnapshot = await getDocs(userQuery);
    if (!querySnapshot.empty) {
      let userSnapshot = querySnapshot.docs[0];
      return { status: "success", data: userSnapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    alert(error.message, "getuser");
    return { status: "error", message: null };
  }
};

//create user in backend
const createUser = async (user) => {
  try {
    const checkUserExist = await getUser(user.email);
    const userdetails = JSON.parse(await AsyncStorage.getItem("userdetails"));
    console.log("userdetails", userdetails);
    if (!checkUserExist) {
      const result = await setDoc(
        doc(db, DB_USERS, userdetails.id),
        userdetails
      );
      return { status: "success", message: result };
    }
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const addSugarEntry = async (userId, data) => {
  try {
    let obj = {
      ...data,
      date: Timestamp.fromDate(data.date),
    };
    const result = await setDoc(
      doc(db, DB_USERS, userId, DB_SUGAR, data.id),
      obj
    );
    return { status: "success", data: result };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const addWeightEntry = async (userId, data) => {
  try {
    let obj = {
      ...data,
      date: Timestamp.fromDate(data.date),
    };
    const result = await setDoc(
      doc(db, DB_USERS, userId, DB_WEIGHT, data.id),
      obj
    );
    return { status: "success", data: result };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const editProfile = async (data, userId) => {
  console.log(data, userId, "utils");
  try {
    const result = await updateDoc(doc(db, DB_USERS, userId), data);
    console.log(result, "utilsresult");
    return { status: "success", data: result };
  } catch (error) {
    console.log(error, "utilserror");
    return { status: "error", message: error.message };
  }
};

const getCollectionData = async (userId) => {
  try {
    //get last 7 details
    const sugarQuery = query(
      collection(db, `${DB_USERS}/${userId}/${DB_SUGAR}`),
      orderBy("date", "desc"),
      limit(7)
    );

    const weightQuery = query(
      collection(db, `${DB_USERS}/${userId}/${DB_WEIGHT}`),
      orderBy("date", "desc"),
      limit(7)
    );

    const [sugarSnapshot, weightSnapshot] = await Promise.all([
      getDocs(sugarQuery),
      getDocs(weightQuery),
    ]);

    const sugarEntries = sugarSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const weightEntries = weightSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      status: "success",
      data: {
        sugarEntries,
        weightEntries,
      },
    };
  } catch (error) {
    console.log(error);
    return { status: "error", message: error.message };
  }
};

export {
  firebaseAuthentication,
  firebaseLogout,
  getUser,
  addSugarEntry,
  addWeightEntry,
  getCollectionData,
  editProfile,
  createUser,
};
