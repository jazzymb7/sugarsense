import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { main, PRIMARY_COLOR } from "../../global";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../../content/AuthContext";

const ListItem = ({ data, label }) => {
  return (
    <View
      style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        {label && label === "Sugar" ? data.sugar : data.weight}
      </Text>
      {label && label === "Sugar" ? <Text>{data.type}</Text> : null}
      <Text>{data.date}</Text>
      {label && label === "Sugar" ? <Text>{data.notes}</Text> : null}
    </View>
  );
};

const ListComponent = () => {
  const { label } = useLocalSearchParams();
  const { sugarData, weightData } = useAuth();

  return (
    <SafeAreaView style={main.common_container_dimensions}>
      <TouchableOpacity
        style={{
          padding: 10,
          flexDirection: "row",
          gap: 10,
        }}
        onPress={() => router.back()}
      >
        <AntDesign name="arrowleft" size={30} />
        <Text style={{ fontSize: 24 }}>{`${label} Data` || ""}</Text>
      </TouchableOpacity>
      <FlatList
        data={label && label === "Sugar" ? sugarData : weightData}
        renderItem={({ item }) => <ListItem data={item} label={label} />}
        contentContainerStyle={{ gap: 5, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default ListComponent;
