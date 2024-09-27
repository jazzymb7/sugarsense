import React from "react";
import { Tabs } from "expo-router";
import { Redirect } from "expo-router";

import { useAuth } from "../../content/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../global";

const AppLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 10 },
        tabBarStyle: { paddingTop: 5 },
        tabBarLabelStyle: { paddingTop: 5 },
        tabBarActiveTintColor: PRIMARY_COLOR,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} color={color} name="home" />
          ),
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profle",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} color={color} name="user" />
          ),
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
