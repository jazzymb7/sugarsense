import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { PRIMARY_COLOR } from "../app/global";
import { useAuth } from "../content/AuthContext";

const BottomSheetProfileComponent = ({ handleClick }) => {
  const { user, editUser } = useAuth();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const handleSubmit = () => {
    if (!firstName || !lastName) {
      alert("First and Last name are required");
      return;
    }
    if (
      firstName.toLowerCase() === user.firstName.toLowerCase() &&
      lastName.toLowerCase() === user.lastName.toLowerCase()
    ) {
      return;
    }
    let obj = {
      firstName,
      lastName,
      email: user.email,
      id: user.id,
    };
    console.log(obj);
    editUser(obj, user.id);
    handleClick(obj);
  };

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={handleClick}
        style={{ alignItems: "flex-end", paddingRight: 10 }}
      >
        <MaterialCommunityIcons name="close" size={30} />
      </TouchableOpacity>
      <View style={{ padding: 16 }}>
        <View style={{ paddingBottom: 16 }}>
          <TextInput
            label="First Name"
            placeholder="100"
            placeholderTextColor="#ccc"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            theme={{ colors: { surfaceVariant: "#fff" } }}
            selectionColor={PRIMARY_COLOR}
            activeUnderlineColor={PRIMARY_COLOR}
          />
        </View>
        <View style={{ paddingBottom: 16 }}>
          <TextInput
            label="Last Name"
            placeholder="100"
            placeholderTextColor="#ccc"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            theme={{ colors: { surfaceVariant: "#fff" } }}
            selectionColor={PRIMARY_COLOR}
            activeUnderlineColor={PRIMARY_COLOR}
          />
        </View>
        <View>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            Submit
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default BottomSheetProfileComponent;
