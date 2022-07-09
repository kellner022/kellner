import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Button } from 'react-native-paper';

import { HomeScreenProps } from "../types";

const HomeScreen = ({ route, navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.main}>
          <View style={styles.logo}>
            <Image source={require("../assets/images/logo.png")}
            style={{width: 230, height: 150, resizeMode: "stretch"}}></Image>
          </View>
          <View>
            <Button
              mode="contained"
              onPress={() => {
                console.log("Jumping to Sign In page");
                navigation.navigate("SignInScreen");
              }}
              color={"white"}
              contentStyle={{ height: 60, width: '100%' }}
              labelStyle={{ fontSize: 22, color: '#C93E54' }}
              style={styles.signInButton}
              uppercase={false}
            >
              Iniciar sesión
            </Button>
            <View>
              <Button
                mode="text"
                onPress={() => {
                  console.log("Jumpng to Create a new account page");
                  navigation.navigate("SignUpScreen");
                }}
                contentStyle={{ height: 60, width: '100%' }}
                labelStyle={{ fontSize: 22, color: 'white' }}
                style={styles.signUpButton}
                uppercase={false}
              >
                Crear una cuenta
              </Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C93E54',
  },
  logo: {
    // paddingHorizontal: '20%',
    // backgroundColor: '#00ff00',
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
    marginTop: 50,
    borderRadius: 50,
    marginHorizontal: '2%',
  },
  signUpButton: {
    marginTop: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    marginHorizontal: '2%',
  },
});
