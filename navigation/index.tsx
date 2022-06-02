/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import { ActivityIndicator, ColorSchemeName, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../components/Context";

import WorkScreen from "../screens/WorkScreen";
import UserScreen from "../screens/UserScreen";
import CoinScreen from "../screens/CoinScreen";
import DataScreen from "../screens/DataScreen";
import PlatformScreen from "../screens/PlatformScreen";
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from "../screens/HomeScreen";

import { Text } from "../components/Themed";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  UserAuthParamList,
} from "../types";

import LinkingConfiguration from "./LinkingConfiguration";

const TopTab = createMaterialTopTabNavigator();
const AuthStack = createStackNavigator<UserAuthParamList>();

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const insets = useSafeAreaInsets();
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const loginReducer = (prevState: any, action: any) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );
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
        dispatch({ type: "LOGIN", id: userName, token: userToken });
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
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        // userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        {loginState.userToken !== null ? (
          <TopTab.Navigator
            initialRouteName="Work"
            screenOptions={{
              tabBarActiveTintColor: "#e91e63",
              tabBarInactiveTintColor: "black",
              tabBarLabelStyle: { fontSize: 20 },
              tabBarStyle: { backgroundColor: "white", paddingTop: insets.top },
            }}
          >
            <TopTab.Screen
              name="Work"
              component={WorkScreen}
              options={{ tabBarLabel: "作品" }}
            />
            <TopTab.Screen
              name="User"
              component={UserScreen}
              options={{ tabBarLabel: "用户" }}
            />
            <TopTab.Screen
              name="Coin"
              component={CoinScreen}
              options={{ tabBarLabel: "硬币" }}
            />
            <TopTab.Screen
              name="Data"
              component={DataScreen}
              options={{ tabBarLabel: "数据" }}
            />
            <TopTab.Screen
              name="Platform"
              component={PlatformScreen}
              options={{ tabBarLabel: "平台" }}
            />
          </TopTab.Navigator>
        ) : (
          <AuthStack.Navigator initialRouteName="Home">
            <AuthStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
            <AuthStack.Screen name="SignInScreen" component={SignInScreen} />
            <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
