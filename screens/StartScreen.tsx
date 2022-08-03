import { StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootState } from '../data/store';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';

export default function StartScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const insets = useSafeAreaInsets();
  const loginState = useSelector((state: RootState) => state.kellner.loginState);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const [restaurantsNearby, setRestaurantsNearby] = useState();

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
