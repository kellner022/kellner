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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { HomeScreenProps } from "../types";

const SignUpScreen = ({ route, navigation }: HomeScreenProps) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [phoneNo, setPhoneNo] = React.useState('');

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
            Registrarse
            </Text>
            <Text style={{ color: "white", fontSize: 18,
            paddingTop: 5,  marginHorizontal: 60,  textAlign: 'center', fontWeight: 'bold'  }}>
            Fill in the following fields to create a new account
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputPrefix}>{`    `}</Text>
              <TextInput
                onChangeText={(text) => {
                  setName(text);
                }}
                value={name}
                keyboardType={"default"}
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor={"white"}
              />
            </View>
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
                onChangeText={(text) => {
                  setPhoneNo(text);
                }}
                value={phoneNo}
                keyboardType={'numeric'}
                style={styles.input}
                placeholder="Número de teléfono"
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
            <View style={styles.inputContainer}>
              <Text style={styles.inputPrefix}>{`    `}</Text>
              <TextInput
                secureTextEntry={true}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                }}
                value={confirmPassword}
                keyboardType={"default"}
                autoComplete={"password"}
                style={styles.input}
                placeholder="Confirmar Contraseña"
                placeholderTextColor={"white"}
              />
            </View>
            <Button
              mode="contained"
              onPress={() => {
                const auth = getAuth();
                  createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                      const user = userCredential.user;
                      console.log('Sign up user succeed: ', user);
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      console.log(`Sign up user failed: ${errorCode} ${errorMessage}`);
                    });
              }}
              color={"white"}
              contentStyle={{ height: 60, width: 350 }}
              labelStyle={{ fontSize: 22 }}
              style={[styles.signInButton, { marginTop: 30 }]}
              uppercase={false}
            >
              Crear cuenta
            </Button>

            <Text style={{ color: "white", fontSize: 20, marginTop: 40 }}>
            ¿Ya tienes una cuenta?
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: 'space-around',
                width: 350,
              }}
              onPress={() => {
                console.log("Create a new account");
                navigation.navigate("SignInScreen");
              }}
            >
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignUpScreen;

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
    marginTop: 20,
    borderRadius: 50,
  },
  input: {
    width: 280,
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
    backgroundColor: "rgba(52, 52, 52, 0.1)",
    borderWidth: 2,
    borderColor: 'white',
  },
  inputPrefix: {
    paddingHorizontal: 5,
    fontSize: 20,
    color: '#9AAAAA',
  },
});
