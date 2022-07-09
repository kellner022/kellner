import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Alert,
} from "react-native";
import { Button } from 'react-native-paper';
import { HomeScreenProps } from "../types";

const ForgetPasswordScreen = ({ route, navigation }: HomeScreenProps) => {
  const [email, setEmail] = React.useState('');

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
            <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
              ¿Has olvidado tu contraseña?
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                paddingTop: 5,
                width: 280,
                textAlign: "center",
              }}
            >
              Introduce tu Email para recibir un link para restaurar tu
              contraseña
            </Text>
            <View style={[styles.inputContainer, { marginTop: 60 }]}>
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
            <View style={[styles.inputContainer, { borderWidth: 0 }]}>
              <Button
                mode="contained"
                onPress={() => {
                  console.log("Sending reset code to email...");
                  Alert.alert(
                    "Reset Password",
                    "We have sent a code to you email box, please check it and fill in next page!"
                  );
                  navigation.navigate("InputVerifyCodeScreen");
                }}
                color={"white"}
                contentStyle={{ height: 60, width: "100%" }}
                labelStyle={{ fontSize: 22, color: "#C93E54" }}
                style={[styles.signInButton, { marginTop: 30 }]}
                uppercase={false}
              >
                Enviar
              </Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ForgetPasswordScreen;

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
    width: '100%',
  },
  input: {
    width: '80%',
    fontSize: 20
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
