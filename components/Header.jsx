import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";

const Header = ({ title, navigateBack }) => {
  return (
    <View>
      {navigateBack && <FontAwesome size={28} name="arrow-left" />}
      <Text>{title}</Text>
    </View>
  );
};

export default Header;
