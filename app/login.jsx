import { View, Text, SafeAreaView } from "react-native";
import { TextInput, Button, SegmentedButtons } from "react-native-paper";
import { main, PRIMARY_COLOR } from "./global";
import { useState } from "react";
import { useAuth } from "../content/AuthContext";

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("login");

  const handleSignUp = () => {
    if (!email || !firstName || !lastName || !password) {
      alert("All values are required");
      return;
    }
    signIn({
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
      value,
    });
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert("Email and Password are required");
      return;
    }

    signIn({ email, password, value });
  };

  return (
    <SafeAreaView style={[main.container, main.common_container_dimensions]}>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          flex: 1,
        }}
      >
        <View>
          <Text
            style={{
              alignItems: "center",
              fontWeight: "bold",
              fontSize: 44,
              textAlign: "center",
              padding: 30,
            }}
          >
            Welcome to SugarSense
          </Text>
        </View>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          style={{ padding: 10, alignItems: "center" }}
          buttons={[
            {
              value: "login",
              label: "Login",
              style: {
                backgroundColor: value === "login" ? PRIMARY_COLOR : "#fff",
              },
              checkedColor: "#fff",
            },
            {
              value: "signup",
              label: "Signup",
              checkedColor: "#fff",
              style: {
                backgroundColor: value === "signup" ? PRIMARY_COLOR : "#fff",
              },
            },
          ]}
        />
        <View style={main.inputscontainer}>
          {value === "signup" && (
            <TextInput
              label="First Name"
              value={firstName}
              onChangeText={(text) => setfirstName(text)}
              theme={{ colors: { surfaceVariant: "#fff" } }}
            />
          )}
          {value === "signup" && (
            <TextInput
              label="Last Name"
              value={lastName}
              onChangeText={(text) => setlastName(text)}
              theme={{ colors: { surfaceVariant: "#fff" } }}
            />
          )}
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={main.input}
            theme={{ colors: { surfaceVariant: "#fff" } }}
          />
          <TextInput
            label="Password"
            value={password}
            style={main.input}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            theme={{ colors: { surfaceVariant: "#fff" } }}
          />
          {value === "signup" && (
            <TextInput
              label="Confirm Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              theme={{ colors: { surfaceVariant: "#fff" } }}
            />
          )}
        </View>
        <View style={{ paddingTop: 24 }}>
          <Button
            mode="contained"
            onPress={value === "login" ? handleLogin : handleSignUp}
            style={{ backgroundColor: PRIMARY_COLOR }}
            labelStyle={{ fontSize: 16 }}
          >
            {value === "login" ? "Login" : "Register"}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
