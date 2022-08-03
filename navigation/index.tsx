/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar } from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import { ActivityIndicator, ColorSchemeName, View, Text, ImageBackground, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../components/Context";

import type { RootState } from '../data/store';
import { useSelector, useDispatch } from 'react-redux';
import { flagAppLoaded, setAuthedUser, clearAuthedUser, updateFirstSignin } from '../data/kellnerSlicer';
import { getAuth } from 'firebase/auth';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from "../screens/HomeScreen";
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import InputVerifyCodeScreen from "../screens/InputVerifyCodeScreen";

import WelcomeScreen from "../screens/WelcomeScreen";
import StartScreen from "../screens/StartScreen";
import OrderScreen from "../screens/BookingScreen";
import ReserveScreen from "../screens/ReserveScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import ProfileScreen from "../screens/ProfileScreen";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  UserAuthParamList,
} from "../types";

import LinkingConfiguration from "./LinkingConfiguration";

const RootTab = createBottomTabNavigator();
const AuthStack = createStackNavigator<UserAuthParamList>();

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.kellner.loginState);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser: any) => {
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;

        try {
          await AsyncStorage.setItem("userToken", userToken);
        } catch (e) {
          console.log(e);
        }
        // dispatch({ type: "LOGIN", id: userName, token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
      toggleTheme: () => {
        setIsDarkTheme((darkTheme) => !darkTheme);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(flagAppLoaded());
    }, 1000);
  }, []);


  const handleAuthStateChanged = async (user: any) => {
    if (user) {
      console.log("We are authenticated now:");
      const authUser = {
        uid: user.uid,
        name: user.displayName,
        phone: user.phoneNumber,
        email: user.email,
        verified: user.emailVerified,
        photo: user.photoURL
      };
      dispatch(setAuthedUser(authUser));
      dispatch(flagAppLoaded());

      const firstSignin = await AsyncStorage.getItem("firstSignin");
      if (firstSignin) {
        console.log('Already sign in some times: ', firstSignin);
        dispatch(updateFirstSignin(false));
      } else {
        console.log('This is the first time singn in');
        dispatch(updateFirstSignin(true));
        AsyncStorage.setItem("firstSignin", "true")
          .then((resp) => {
            console.log("Set firstSignin state succeed!");
          })
          .catch((e) => {
            console.log("Update firstSignin error", e);
          });
      }

      // dispatch(updateFirstSignin(true)); //For debug only
    } else {
      console.log("We are sign out now:");
      dispatch(clearAuthedUser());
      dispatch(flagAppLoaded());
    }
  };

  useEffect(() => {
    return getAuth().onAuthStateChanged(handleAuthStateChanged);
  }, []);

  if (loginState.isLoading) {
    console.log('Loading...');
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/background.png")}
          resizeMode="repeat"
          style={styles.image}
        >
          <View style={styles.main}>
            <Image
              source={require("../assets/images/logo.png")}
              style={{ width: 230, height: 150, resizeMode: "stretch" }}
            ></Image>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        </ImageBackground>
      </View>
    );
  }

  if (loginState.user !== null && loginState.isFirstSignin) {
    return (
      <WelcomeScreen />
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        {loginState.user !== null ? (
            <RootTab.Navigator
              initialRouteName="Home"
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  if (route.name === "Start") {
                    return (
                      <Ionicons
                        name={focused ? "md-grid" : "md-grid-outline"}
                        size={30}
                        color={color}
                      />
                    );
                  } else if (route.name === "Reserve") {
                    return (
                      <Ionicons
                        name={focused ? "location" : "location-outline"}
                        size={30}
                        color={color}
                      />
                    );
                  } else if (route.name === "Booking") {
                    return focused ? (
                      <FontAwesome
                        name="shopping-bag"
                        size={30}
                        color="tomato"
                      />
                    ) : (
                      <SimpleLineIcons name="handbag" size={30} color="black" />
                    );
                  } else if (route.name === "Favorite") {
                    return focused ? (
                      <MaterialIcons name="favorite" size={30} color="tomato" />
                    ) : (
                      <MaterialIcons
                        name="favorite-outline"
                        size={30}
                        color="black"
                      />
                    );
                  } else if (route.name === "Profile") {
                    return (
                      <Avatar.Image
                        size={35}
                        source={{
                          uri: "https://media-exp1.licdn.com/dms/image/C4E03AQGikvrZ6BNAOg/profile-displayphoto-shrink_200_200/0/1517479982060?e=1664409600&v=beta&t=t0NW-m5QBiM36xyZFRcas-Vv-6KTUw2KGIl9uZxbc-k",
                        }}
                      />
                    );
                  }
                },
                tabBarInactiveTintColor: "black",
                tabBarActiveTintColor: "tomato",
                tabBarLabelStyle: { fontSize: 18, paddingBottom: 10 },
                tabBarStyle: { backgroundColor: "white", height: "12%" },
              })}
            >
              <RootTab.Screen
                name="Start"
                component={StartScreen}
                options={{ tabBarLabel: "Inicio", headerShown: false }}
              />
              <RootTab.Screen
                name="Reserve"
                component={ReserveScreen}
                options={{ tabBarLabel: "Reservas", headerShown: false }}
              />
              <RootTab.Screen
                name="Booking"
                component={OrderScreen}
                options={{ tabBarLabel: "Pedido", headerShown: false }}
              />
              <RootTab.Screen
                name="Favorite"
                component={FavoriteScreen}
                options={{ tabBarLabel: "Favoritos", headerShown: false }}
              />
              <RootTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  tabBarLabel: "Mi perfil",
                  headerShown: false,
                  tabBarBadge: "2",
                }}
              />
            </RootTab.Navigator>
        ) : (
          <AuthStack.Navigator initialRouteName="Home">
            <AuthStack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <AuthStack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <AuthStack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <AuthStack.Screen
              name="ForgetPasswordScreen"
              component={ForgetPasswordScreen}
              options={{ headerShown: false }}
            />
            <AuthStack.Screen
              name="InputVerifyCodeScreen"
              component={InputVerifyCodeScreen}
              options={{ headerShown: false }}
            />
            <AuthStack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
              options={{ headerShown: false }}
            />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#C93E54",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

