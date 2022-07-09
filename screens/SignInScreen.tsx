import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { HomeScreenProps } from "../types";

const SignInScreen = ({ route, navigation }: HomeScreenProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="repeat"
        style={styles.image}
      >
        <View style={styles.main}>
          <View style={styles.logo}>
            <Image
              source={require("../assets/images/logo.png")}
              resizeMethod={"resize"}
              resizeMode={"center"}
            ></Image>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 0,
            }}
          >
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
              Iniciar sesión
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputPrefix}>{`    `}</Text>
              <TextInput
                onChangeText={(text) => {
                  setEmail(text);
                }}
                value={email}
                keyboardType={"default"}
                autoComplete={"password"}
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={"white"}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputPrefix}>{`    `}</Text>
              <TextInput
                secureTextEntry={true}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                value={password}
                keyboardType={"default"}
                autoComplete={"password"}
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={"white"}
              />
            </View>
            <View style={[styles.inputContainer, {borderWidth: 0}]}>
              <Button
                mode="contained"
                onPress={() => {
                  console.log("Jumping to Sign In page");
                  Alert.alert("Sign In", "Sign in succeed!");
                }}
                color={"white"}
                contentStyle={{ height: 60, }}
                labelStyle={{ fontSize: 22, color: "#C93E54" }}
                style={styles.signInButton}
                uppercase={false}
              >
                Entrar
              </Button>
            </View>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                width: 350,
              }}
              onPress={() => {
                console.log("Forget password");
                navigation.navigate("ForgetPasswordScreen");
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                ¿Olvidaste la contraseña?
              </Text>
            </TouchableOpacity>

            <Text style={{ color: "white", fontSize: 20, marginTop: 50 }}>
              Iniciar sesión con
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                backgroundColor: "white",
                padding: 10,
                height: 60,
                borderRadius: 10,
                width: '80%',
                marginTop: 5,
              }}
              onPress={() => {
                console.log("Sign in with Apple");
              }}
            >
              <MaterialCommunityIcons name="apple" color={"black"} size={30} />
              <Text style={{ fontSize: 22 }}>Iniciar sesión con Apple</Text>
            </TouchableOpacity>

            <Text style={{ color: "white", fontSize: 20, marginTop: 30 }}>
              ¿Aún no tienes Kellner?
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                width: 350,
              }}
              onPress={() => {
                console.log("Create a new account");
                navigation.navigate("SignUpScreen");
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                Crear una cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C93E54",
  },
  logo: {
    // paddingHorizontal: 30,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  signInButton: {
    // marginTop: 20,
    borderRadius: 50,
    width: '90%',
  },
  input: {
    width: '75%',
    fontSize: 22
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 50,
    height: 60,
    margin: 6,
    padding: 10,
    fontSize: 20,
    backgroundColor: "rgba(52, 52, 52, 0.0)",
    borderWidth: 2,
    borderColor: 'white',
  },
  inputPrefix: {
    paddingHorizontal: 5,
    fontSize: 20,
    color: '#9AAAAA',
  },
});
