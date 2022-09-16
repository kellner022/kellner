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

const ResetPasswordScreen = ({ route, navigation }: HomeScreenProps) => {
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

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
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            Nueva contraseña
            </Text>
            <Text style={{ color: "white", fontSize: 18,
            paddingTop: 5,  width: 350, textAlign: 'center', fontWeight: 'bold'  }}>
            Por favor, introduzca su nueva contraseña para continuar
            </Text>
            <View style={[styles.inputContainer, {marginTop: 50}]}>
              <Text style={styles.inputPrefix}>{`    `}</Text>
              <TextInput
                secureTextEntry={true}
                onChangeText={(text) => {
                  setNewPassword(text);
                }}
                value={newPassword}
                keyboardType={"default"}
                autoComplete={"password"}
                style={styles.input}
                placeholder="Nueva Contraseña"
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
                console.log("Resetting password ...");
                Alert.alert('Resetting Password', 'New password was set successfully!');
                // navigation.navigate("SignInScreen");
              }}
              color={"white"}
              contentStyle={{ height: 60, width: 350 }}
              labelStyle={{ fontSize: 22, color: '#C93E54' }}
              style={[styles.signInButton, { marginTop: 30 }]}
              uppercase={false}
            >
              Siguiente
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ResetPasswordScreen;

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
