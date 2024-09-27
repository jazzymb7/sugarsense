import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { PRIMARY_COLOR } from "../app/global";
import { useAuth } from "../content/AuthContext";
import { v4 as uuidv4 } from "uuid";

const MIN_DATE = new Date(2000, 0, 1);

const BottomSheetWeightComponent = ({ handleClick }) => {
  const { createWeightEntry, user } = useAuth();
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(new Date());

  const handleChange = (event, selectedDate) => {
    setDate(selectedDate);
  };

  const handleSubmit = () => {
    if (!weight || !date) {
      alert("Weight and Date are required");
      return;
    }
    if (!/^\d+(\.\d+)?$/.test(weight)) {
      alert("Please enter only numbers");
      return;
    }
    let weight_entry = {
      weight: weight,
      date: date,
      id: uuidv4(),
      email: user.email,
    };
    createWeightEntry(weight_entry);
    handleClick();
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
            label="Weight"
            placeholder="85"
            placeholderTextColor="#ccc"
            value={weight}
            onChangeText={(text) => setWeight(text)}
            theme={{ colors: { surfaceVariant: "#fff" } }}
            selectionColor={PRIMARY_COLOR}
            activeUnderlineColor={PRIMARY_COLOR}
          />
        </View>
        <View style={{ paddingBottom: 26 }}>
          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              is24Hour={true}
              onChange={handleChange}
              maximumDate={new Date()}
              minimumDate={MIN_DATE}
            />
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"time"}
              is24Hour={true}
              onChange={handleChange}
            />
          </View>
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

export default BottomSheetWeightComponent;
