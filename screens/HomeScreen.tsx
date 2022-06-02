import React from "react";
import {
  View,
  Image,
  Platform,
  StyleSheet,
  StatusBar,
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
        <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
        <View style={styles.main}>
          <View style={styles.logo}>
            <Image source={require("../assets/images/logo.png")}></Image>
          </View>
          <View>
            <Button
              mode="contained"
              onPress={() => {
                console.log("Login");
              }}
              color={"white"}
              contentStyle={{ height: 80, width: 280 }}
              labelStyle={{ fontSize: 22 }}
              style={styles.signInButton}
              uppercase={false}
            >
              Iniciar sesión
            </Button>
            <View>
              <Button
                mode="contained"
                onPress={() => {
                  console.log("Create a new account");
                }}
                contentStyle={{ height: 80, width: 280 }}
                labelStyle={{ fontSize: 22 }}
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
    backgroundColor: "#FF6347",
  },
  logo: {
    paddingHorizontal: 30,
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
  },
  signUpButton: {
    marginTop: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "rgba(52, 52, 52, 0.1)",
  },
});
