import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Button } from 'react-native-paper';
import { HomeScreenProps } from "../types";

const InputVerifyCodeScreen = ({ route, navigation }: HomeScreenProps) => {
  const [code1, setCode1] = React.useState('');
  const [code2, setCode2] = React.useState('');
  const [code3, setCode3] = React.useState('');
  const [code4, setCode4] = React.useState('');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="repeat"
        style={styles.image}
      >
        <View style={styles.main}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 0,
            }}
          >
            <View style={styles.inputContainer}>
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  fontWeight: "bold",
                  width: "90%",
                  textAlign: "center",
                }}
              >
                Hemos mandado un mensaje a tu móvil
              </Text>
            </View>

            <View style={styles.inputContainer}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                paddingTop: 5,
                width: '95%',
                textAlign: "center",
              }}
            >
              Por favor, introduce el código que hemos mandado al ******709 para
              restaurar tu contraseña
            </Text>
            </View>
            
            <View style={styles.inputContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 50,
                width: '100%',
              }}
            >
              <TextInput
                secureTextEntry={true}
                onChangeText={(text) => {
                  setCode1(text);
                }}
                value={code1}
                keyboardType={"numeric"}
                autoComplete={"password"}
                style={styles.input}
                maxLength={1}
              />
              <TextInput
                secureTextEntry={true}
                onChangeText={(text) => {
                  setCode2(text);
                }}
                value={code2}
                keyboardType={"numeric"}
                autoComplete={"password"}
                style={styles.input}
                maxLength={1}
              />
              <TextInput
                secureTextEntry={true}
                onChangeText={(text) => {
                  setCode3(text);
                }}
                value={code3}
                keyboardType={"numeric"}
                autoComplete={"password"}
                style={styles.input}
                maxLength={1}
              />
              <TextInput
                secureTextEntry={true}
                onChangeText={(text) => {
                  setCode4(text);
                }}
                value={code4}
                keyboardType={"numeric"}
                autoComplete={"password"}
                style={styles.input}
                maxLength={1}
              />
            </View>
            </View>
            
            <View style={styles.inputContainer}>
            <Button
              mode="contained"
              onPress={() => {
                console.log("Verify code ok, jump to reset password page");
                navigation.navigate("ResetPasswordScreen");
              }}
              color={"white"}
              contentStyle={{ height: 60, }}
              labelStyle={{ fontSize: 22, color: "#C93E54" }}
              style={[styles.signInButton, { marginTop: 50 }]}
              uppercase={false}
            >
              Siguiente
            </Button>
            </View>
            
            <Text
              style={{
                color: "white",
                fontSize: 18,
                paddingTop: 30,
                width: 280,
                textAlign: "center",
              }}
            >
              ¿No has Recibido nada?
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                width: 350,
              }}
              onPress={() => {
                console.log("Resend the code");
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  paddingTop: 10,
                  width: 280,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Pincha aquí
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default InputVerifyCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6347",
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
    marginTop: 20,
    borderRadius: 50,
    width: '95%'
  },
  input: {
    width: 60,
    height: 60,
    fontSize: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    margin: 6,
    padding: 10,
    fontSize: 20,
  },
  inputPrefix: {
    paddingHorizontal: 5,
    fontSize: 20,
    color: '#9AAAAA',
  },
});
