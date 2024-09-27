import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { PRIMARY_COLOR } from "../app/global";
import { useAuth } from "../content/AuthContext";
import { v4 as uuidv4 } from "uuid";

const GRS = [
  { name: "fasted", label: "Fasted" },
  { name: "beforefood", label: "Before Food" },
  { name: "afterfood", label: "After Food" },
  { name: "bedtime", label: "Bed Time" },
  { name: "random", label: "Random" },
];

const MIN_DATE = new Date(2000, 0, 1);

const BottomSheetComponent = ({ handleClick }) => {
  const { createSugarEntry, user } = useAuth();
  const [sugar, setSugar] = useState("");
  const [date, setDate] = useState(new Date());
  const [checked, setChecked] = useState("fasted");
  const [notes, setNotes] = useState("");

  const handleChange = (event, selectedDate) => {
    setDate(selectedDate);
  };

  const handleSubmit = () => {
    if (!sugar || !date || !checked) {
      alert("Glucose Reading, Date and Type are required");
      return;
    }
    if (!/^\d+(\.\d+)?$/.test(sugar)) {
      alert("Please enter only numbers in glucose reading");
      return;
    }
    let sugar_entry = {
      sugar: sugar,
      date: date,
      type: checked,
      notes: notes,
      id: uuidv4(),
      email: user.email,
    };
    createSugarEntry(sugar_entry);
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
            label="Glucose Reading"
            placeholder="100"
            placeholderTextColor="#ccc"
            value={sugar}
            onChangeText={(text) => setSugar(text)}
            theme={{ colors: { surfaceVariant: "#fff" } }}
            selectionColor={PRIMARY_COLOR}
            activeUnderlineColor={PRIMARY_COLOR}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-betwen",
              flexWrap: "wrap",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {GRS.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setChecked(item.name)}
                style={{
                  borderColor: PRIMARY_COLOR,
                  borderWidth: 1,
                  padding: 10,
                  margin: 5,
                  borderRadius: 10,
                  flexWrap: "wrap",
                  backgroundColor:
                    checked === item.name ? PRIMARY_COLOR : "#fff",
                }}
              >
                <Text
                  style={{
                    color: checked === item.name ? "#fff" : PRIMARY_COLOR,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
        <View style={{ paddingBottom: 26 }}>
          <TextInput
            label="Notes"
            multiline={true}
            value={notes}
            onChangeText={(text) => setNotes(text)}
            theme={{ colors: { surfaceVariant: "#fff" } }}
            maxLength={100}
            right={<TextInput.Affix text={100 - notes.length} />}
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

export default BottomSheetComponent;
