import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from "react";
import { Provider } from 'react-redux'
import { initializeApp } from 'firebase/app';
import { useFonts } from 'expo-font';
import { RootSiblingParent } from 'react-native-root-siblings';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from './data/store';

// Initialize Firebase
const firebaseConfig = {
  databaseURL: 'https://kellner-a0864.firebaseio.com',
  apiKey: "AIzaSyA6v-cV0fOIwBtMVtz_Na-IfRcjqiclvdc",
  authDomain: "kellner-a0864.firebaseapp.com",
  projectId: "kellner-a0864",
  storageBucket: "kellner-a0864.appspot.com",
  messagingSenderId: "387285182962",
  appId: "1:387285182962:web:535e72717ddc9cfd9ae36b",
  measurementId: "G-DWTLJLL6RB"
};

initializeApp(firebaseConfig);

export default function App() {
  const colorScheme = useColorScheme();

  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('./assets/fonts/SpaceMono-Regular.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <RootSiblingParent>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </RootSiblingParent>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
