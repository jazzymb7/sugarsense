import { Slot } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts as poppinsfont,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import AuthProvider from "../content/AuthContext";

//styles

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // initialRouteName: "(user)",
  initialRouteName: "login",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [poppinsloaded, poppinserror] = poppinsfont({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (poppinserror) {
      throw poppinserror;
    }
  }, [poppinserror]);

  useEffect(() => {
    if (poppinsloaded) {
      //   SplashScreen.hideAsync();
    }
  }, [poppinsloaded]);

  if (!poppinsloaded) {
    // return <SplashScreenComponent />;
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <SafeAreaProvider>
          <Slot />
        </SafeAreaProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
