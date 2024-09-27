import React, { useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { main, PRIMARY_COLOR } from "../global";
import { useAuth } from "../../content/AuthContext";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import BottomSheetProfileComponent from "../../components/BottomSheetProfile";

const { height: totalHeight } = Dimensions.get("screen");

const Profile = () => {
  const { logout, user } = useAuth();
  const bottomSheetProfileRef = useRef(null);

  const handleOpen = () => bottomSheetProfileRef.current.expand();

  const handleClose = (obj) => {
    console.log("profile", obj);
    bottomSheetProfileRef.current.close();
  };

  return (
    <SafeAreaView style={main.common_container_dimensions}>
      <ScrollView style={main.common_container_styles}>
        <TouchableOpacity
          style={[main.common_view_styles, main.profile_edit_button_container]}
          onPress={() => handleOpen()}
        >
          <MaterialIcons name="edit" color={PRIMARY_COLOR} size={20} />
        </TouchableOpacity>

        <View style={main.common_view_styles}>
          <Text>First Name</Text>
          <Text style={main.common_label_styles}>{user?.firstName}</Text>
        </View>
        <View style={main.common_view_styles}>
          <Text>Last Name</Text>
          <Text style={main.common_label_styles}>{user?.lastName}</Text>
        </View>
        <View style={main.common_view_styles}>
          <Text>Email</Text>
          <Text style={main.common_label_styles}>{user?.email}</Text>
        </View>
        <View style={main.common_view_styles}>
          <Button
            buttonColor={PRIMARY_COLOR}
            mode="contained"
            onPress={() => logout()}
          >
            <Text style={main.profile_edit_button_text}>Logout</Text>
          </Button>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetProfileRef}
        index={-1}
        snapPoints={[totalHeight - 150]}
      >
        <BottomSheetScrollView>
          <BottomSheetProfileComponent handleClick={handleClose} />
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Profile;
