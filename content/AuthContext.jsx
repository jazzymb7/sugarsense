import { createContext, useEffect, useState, useContext } from "react";
import "react-native-get-random-values";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, db } from "../firebase/firebase";
import { router } from "expo-router";
import {
  addSugarEntry,
  addWeightEntry,
  getCollectionData,
  firebaseAuthentication,
  firebaseLogout,
  getUser,
  editProfile,
  createUser,
} from "./utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  user: null,
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a <AuthProvider />");
  }
  return context;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sugarData, setSugarData] = useState([]);
  const [weightData, setWeightData] = useState([]);

  //login function
  const signIn = async (obj) => {
    const result = await firebaseAuthentication(obj);
    if (result.status === "success" && result.value === "login") {
      setLoading(false);
      router.replace("/(app)");
    }
  };

  const createSugarEntry = async (data) => {
    try {
      const result = await addSugarEntry(user.id, data);
      //logic to set the data
      let date = new Date(data.date);
      const day = date.getDate();
      const monthFormatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
      });
      const month = monthFormatter.format(date);
      const formattedDate = `${day} ${month}`;
      let obj = {
        ...data,
        sugar: parseFloat(data.sugar),
        date: formattedDate,
      };
      setSugarData((prevSugarData) => [...prevSugarData, obj]);
    } catch (error) {
      alert(error.message);
    }
  };

  const createWeightEntry = async (data) => {
    try {
      const result = await addWeightEntry(user.id, data);
      let date = new Date(data.date);
      const day = date.getDate();
      const monthFormatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
      });
      const month = monthFormatter.format(date);
      const formattedDate = `${day} ${month}`;
      let obj = {
        ...data,
        weight: parseFloat(data.weight),
        date: formattedDate,
      };
      setWeightData((prevWeightData) => [...prevWeightData, obj]);
      //logic to set the data
    } catch (error) {
      alert(error.message);
    }
  };

  const getUserDetails = async (email) => {
    try {
      const cached_user = await AsyncStorage.getItem("userdetails");
      let user = null;
      if (cached_user) {
        user = JSON.parse(cached_user);
      } else {
        const result = await getUser(email);
        AsyncStorage.setItem("userdetails", JSON.stringify(result.data));
        user = result.data;
      }
      return user;
    } catch (error) {
      console.log("erroir called");
      alert(error.message);
    }
  };

  const logout = async () => {
    let logoutCredential = await firebaseLogout();
    if (logoutCredential) {
      router.replace("/login");
    }
  };

  const getData = async (userId) => {
    try {
      const result = await getCollectionData(userId);
      let sugarData = result.data.sugarEntries.map((item) => {
        const formattedDate = item.date.toDate
          ? item.date.toDate().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })
          : item.date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            });
        return {
          ...item,
          date: formattedDate,
          sugar: parseFloat(item.sugar),
        };
      });

      let weightData = result.data.weightEntries.map((item) => {
        const formattedDate = item.date.toDate
          ? item.date.toDate().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })
          : item.date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            });
        return {
          ...item,
          date: formattedDate,
          weight: parseFloat(item.weight),
        };
      });
      setSugarData(sugarData ? sugarData.reverse() : []);
      setWeightData(weightData ? weightData.reverse() : []);
      return true;
    } catch (error) {
      alert(error.message);
      return null;
    }
  };

  const editUser = async (data, userId) => {
    console.log(data, userId, "context", user.uid);
    try {
      const result = await editProfile(data, userId);
      AsyncStorage.setItem("userdetails", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const initializeUser = async (user) => {
    try {
      if (!user) {
        router.replace("/login");
      } else if (user && !user.emailVerified) {
        alert("Please Verify your email and try again");
      } else {
        const userdetails = await getUserDetails(user.email);
        const result = await getData(userdetails.id);
        setUser(userdetails);
        setLoading(false);
        router.replace("/(app)/home");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, initializeUser);
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        logout,
        createSugarEntry,
        createWeightEntry,
        sugarData,
        weightData,
        getData,
        editUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
