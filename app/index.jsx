import { ActivityIndicator, View } from "react-native";

const Loading = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <ActivityIndicator />
    </View>
  );
};

export default Loading;
