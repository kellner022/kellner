import { StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { Text, View } from '../components/Themed';
import { RootTabStartScreenProps, StartStackParamList, StartHomeScreenProps, StartRecipeScreenProps, StartCommentScreenProps } from '../types';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootState } from '../data/store';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import Restaurant from '../model/restaurant';
import Propaganda from '../model/propaganda';

const StartStack = createStackNavigator<StartStackParamList>();

const StartHomeScreen = ({ route, navigation }: StartHomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const loginState = useSelector((state: RootState) => state.kellner.loginState);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const [restaurantsNearby, setRestaurantsNearby] = useState<Restaurant[]>([
    {
      id: 0,
      name: 'Bar Italia',
      loc: [105.32, 56.75],
      recips: [0, 1, 2],
      images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-restaurants-1.png?alt=media&token=829a397c-9608-4925-bde1-8f04de4b746b'],
      address: 'Viale Europa, 21, 80053 Castellammare di Stabia NA, Italy',
      stars: 4.9,
      introduction: '',
      comments: [0, 1, 2, 3],
    }
  ]);
  const [restaurantsNew, setRestaurantsNew] = useState<Restaurant[]>([
    {
      id: 3,
      name: 'Bambaa American',
      loc: [115.45, 96.13],
      recips: [0, 1, 2],
      images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-new-1.png?alt=media&token=5016916c-8d8c-47cc-8bcc-a7ef852f72ae'],
      address: '202 S Main St, Salt Lake City, UT 84101US',
      stars: 4.9,
      introduction: '',
      comments: [0, 1, 2, 3],
    }
  ]);
  const [restaurantsBack, setRestaurantsBack] = useState<Restaurant[]>([
    {
      id: 4,
      name: 'Mulberry Pizza',
      loc: [97.38, 102.54],
      recips: [0, 1, 2],
      images: [''],
      address: '101 Smith Ranch Rd C, San Rafael, CA 94903US',
      stars: 4.9,
      introduction: '',
      comments: [0, 1, 2, 3],
    }
  ]);
  const [propagandasMid, setPropagandasMid] = useState<Propaganda[]>([
    {
      id: 0,
      title: 'Prueba algo nuevo',
      subtitle: 'Saca tu lado más italiano',
      poster: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-proganda-1.png?alt=media&token=f8f27d18-f54d-4887-8123-04abc3f813f3',
    }
  ]);
  const [propagandasBottom, setPropagandasBottom] = useState<Propaganda[]>([
    {
      id: 2,
      title: 'Toma un respiro',
      subtitle: 'Lugares donde potenciar tu creatividad',
      poster: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-progda-2.png?alt=media&token=0cf4cc2e-1af6-4d24-83e3-992f279c2c44',
    }
  ]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.greeting}>
        <View>
          <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 30 }}>
            Buenas noches,
          </Text>
          <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 25 }}>
            {loginState.user?.name ? loginState.user?.name : "Guest"}
          </Text>
        </View>
        <View>
          <Feather name="camera" size={34} color="#707070" />
        </View>
      </View>
      <View style={styles.search}>
        <View style={styles.inputContainer}>
        <Feather name="search" size={24} color="#7C7D7E" style={styles.inputPrefix} />
        <TextInput
          secureTextEntry={false}
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholder='Buscar restaurante'
          keyboardType={'default'}
          // autoComplete={'password'}
          
          style={styles.input}
        />
      </View>
      </View>
      <View style={styles.popularRestaurant}>

      </View>
      <View style={styles.propagandaMid}></View>
      <View style={styles.youMayAlsoLike}></View>
      <View style={styles.goBackPreBuy}></View>
      <View style={styles.PropagandaBottom}></View>
    </View>
  );
};

const StartRecipeScreen = ({ route, navigation }: StartRecipeScreenProps) => {
  return (
    <View></View>
  );
};

const StartCommentScreen = ({ route, navigation }: StartCommentScreenProps) => {
  return (
    <View></View>
  );
};


export default function StartScreen({ route, navigation }: RootTabStartScreenProps) {
  return (
    <StartStack.Navigator initialRouteName="StartHomeScreen">
      <StartStack.Screen
        name="StartHomeScreen"
        component={StartHomeScreen}
      />
      <StartStack.Screen
        name="StartRecipeScreen"
        component={StartRecipeScreen}
        initialParams={{ id: undefined }}
      />
      <StartStack.Screen
        name="StartCommentScreen"
        component={StartCommentScreen}
        initialParams={{ id: undefined }}
      />
    </StartStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  search: {
  },
  popularRestaurant: {

  },
  propagandaMid: {},
  youMayAlsoLike: {},
  goBackPreBuy: {},
  PropagandaBottom: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 50,
    height: 60,
    margin: 12,
    padding: 10,
    fontSize: 20,
    backgroundColor: '#F2F2F2',
  },
  inputPrefix: {
    paddingHorizontal: 5,
    fontSize: 25,
    color: '#9AAAAA',
  },
  input: {
    width: '80%',
    fontSize: 20,
    paddingLeft: 10,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: '#F2F2F2',
  },
});
