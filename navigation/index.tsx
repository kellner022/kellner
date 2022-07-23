/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from "../screens/HomeScreen";
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import InputVerifyCodeScreen from "../screens/InputVerifyCodeScreen";

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

  const auth = getAuth();
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

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      console.log("We are authenticated now!");
    }

    // Do other things
  });
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
        // userToken = '1234567890qazxswedcv';
        console.log('Get user token from local storage: ', userToken);
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
          <RootTab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Start') {
                  return (
                    <Ionicons
                      name={
                        focused
                          ? 'ios-information-circle'
                          : 'ios-information-circle-outline'
                      }
                      size={size}
                      color={color}
                    />
                  );
                } else if (route.name === 'Settings') {
                  return (
                    <Ionicons
                      name={focused ? 'menu' : 'ios-list'}
                      size={size}
                      color={color}
                    />
                  );
                }
              },
              tabBarInactiveTintColor: "black",
              tabBarActiveTintColor: 'tomato',
              tabBarLabelStyle: { fontSize: 20 },
              tabBarStyle: { backgroundColor: "white", paddingTop: insets.top },
            })}
          >
            <RootTab.Screen
              name="Start"
              component={StartScreen}
              options={{ tabBarLabel: "Inicio", headerShown: false  }}
            />
            <RootTab.Screen
              name="Reserve"
              component={ReserveScreen}
              options={{ tabBarLabel: "Reservas", headerShown: false  }}
            />
            <RootTab.Screen
              name="Booking"
              component={OrderScreen}
              options={{ tabBarLabel: "Pedido", headerShown: false  }}
            />
            <RootTab.Screen
              name="Favorite"
              component={FavoriteScreen}
              options={{ tabBarLabel: "Favoritos", headerShown: false  }}
            />
            <RootTab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ tabBarLabel: "Mi perfil", headerShown: false }}
            />
          </RootTab.Navigator>
        ) : (
          <AuthStack.Navigator initialRouteName="Home">
            <AuthStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
            <AuthStack.Screen name="SignInScreen" component={SignInScreen} options={{headerShown: false}} />
            <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}} />
            <AuthStack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} options={{headerShown: false}} />
            <AuthStack.Screen name="InputVerifyCodeScreen" component={InputVerifyCodeScreen} options={{headerShown: false}} />
            <AuthStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{headerShown: false}} />
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
