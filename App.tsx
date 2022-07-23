import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

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
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
