import { StyleSheet, TextInput, Button, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import { Text, View } from '../components/Themed';
import { RootTabStartScreenProps, StartStackParamList, StartScreenProps } from '../types';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootState } from '../data/store';
import { useSelector } from 'react-redux';
import { Feather, Entypo, MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Swiper from 'react-native-swiper';

import Restaurant from '../model/restaurant';
import Propaganda from '../model/propaganda';

const StartStack = createStackNavigator<StartStackParamList>();

const StartHomeScreen = ({ route, navigation }: StartScreenProps<'StartHomeScreen'>) => {
  const insets = useSafeAreaInsets();
  const loginState = useSelector((state: RootState) => state.kellner.loginState);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };
  const [restaurantsNearby, setRestaurantsNearby] = useState<Restaurant[]>([
    {
      id: 0,
      name: 'Bar Italia',
      loc: [105.32, 56.75],
      recips: [0, 1, 2],
      images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-restaurants-2.png?alt=media&token=36873756-2d2d-4f16-8133-233980503556'],
      address: 'Viale Europa, 21, 80053 Castellammare di Stabia NA, Italy',
      stars: 4.9,
      introduction: '',
      comments: [0, 1, 2, 3],
    },
    {
      id: 1,
      name: 'Corito sano',
      loc: [105.32, 56.75],
      recips: [0, 1, 2],
      images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-restaurants-1.png?alt=media&token=36873756-2d2d-4f16-8133-233980503556'],
      address: 'Viale Europa, 21, 80053 Castellammare di Stabia NA, Italy',
      stars: 4.9,
      introduction: '',
      comments: [0, 1, 2, 3],
    },
    {
      id: 2,
      name: 'Corito IN-sano',
      loc: [105.32, 56.75],
      recips: [0, 1, 2],
      images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-restaurants-3.png?alt=media&token=36873756-2d2d-4f16-8133-233980503556'],
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
    },
    {
      id: 4,
      name: 'Donna Panca',
      loc: [155.45, 206.13],
      recips: [0, 1, 2],
      images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-new-1.png?alt=media&token=5016916c-8d8c-47cc-8bcc-a7ef852f72ae'],
      address: '202 S Main St, Salt Lake City, UT 84101US',
      stars: 4.9,
      introduction: '',
      comments: [0, 1, 2, 3],
    },
    {
      id: 5,
      name: 'Donna Panca',
      loc: [155.45, 206.13],
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
      images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-back-1.png?alt=media&token=6dd73b92-6ad8-4821-a7fc-59b9ea6d416e'],
      address: '101 Smith Ranch Rd C, San Rafael, CA 94903US',
      stars: 4.9,
      introduction: '',
      comments: [0, 1, 2, 3],
    },
    {
      id: 5,
      name: 'Café Paris',
      loc: [97.38, 102.54],
      recips: [0, 1, 2],
      images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-back-2.png?alt=media&token=e630a206-5bd5-4c0d-934c-19003bc2f70e'],
      address: '101 Smith Ranch Rd C, San Rafael, CA 94903US',
      stars: 4.9,
      introduction: '',
      comments: [0, 1, 2, 3],
    },
    {
      id: 6,
      name: 'Fiorentini',
      loc: [97.38, 102.54],
      recips: [0, 1, 2],
      images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-back-3.png?alt=media&token=a1b40d22-6040-42af-b94a-72a8e96619fd'],
      address: '101 Smith Ranch Rd C, San Rafael, CA 94903US',
      stars: 4.9,
      introduction: '',
      comments: [0, 1, 2, 3],
    },
  ]);
  const [propagandasMid, setPropagandasMid] = useState<Propaganda[]>([
    {
      id: 0,
      title: 'Prueba algo nuevo',
      subtitle: 'Saca tu lado más italiano',
      poster: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-proganda-1.png?alt=media&token=f8f27d18-f54d-4887-8123-04abc3f813f3',
    },
    {
      id: 1,
      title: 'Cita con tu crush',
      subtitle: 'Restaurantes para enamorar',
      poster: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-proganda-2.png?alt=media&token=17aee894-e7db-410f-8426-c347d9b6fe7f',
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
        <View style={{ backgroundColor: "white" }}>
          <Text
            style={{
              fontFamily: "Montserrat-SemiBold",
              fontSize: 30,
              color: "black",
            }}
          >
            Buenas noches,
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat-Regular",
              fontSize: 25,
              color: "black",
            }}
          >
            {loginState.user?.name ? loginState.user?.name : "Guest"}
          </Text>
        </View>
        <View style={{ backgroundColor: "white" }}>
          <Feather name="camera" size={34} color="#707070" />
        </View>
      </View>
      <View style={styles.search}>
        <View style={styles.inputContainer}>
          <Feather
            name="search"
            size={24}
            color="#7C7D7E"
            style={styles.inputPrefix}
          />
          <TextInput
            secureTextEntry={false}
            onChangeText={onChangeSearch}
            value={searchQuery}
            placeholder="Buscar restaurante"
            keyboardType='default'
            // autoComplete={'password'}
            allowFontScaling={true}
            style={styles.input}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.popularRestaurant}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              alignItems: "baseline",
              marginBottom: 10,
              backgroundColor: '#FFFFFF',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                width: "70%",
                color: "#434445",
                fontFamily: "Montserrat-SemiBold",
              }}
            >
              Restaurantes populares cerca de ti
            </Text>
            <Text
              style={{
                color: "#C93E54",
                fontSize: 15,
                width: "25%",
                fontFamily: "Montserrat-Regular",
              }}
            >
              Ver todos
            </Text>
          </View>
          {restaurantsNearby.map((item, index) => {
            return (
              <View key={`restaurant-nearby-${index}`} style={{backgroundColor: '#FFFFFF',}}>
                <Image
                  source={{ uri: item.images.length ? item.images[0] : "" }}
                  style={{ width: "100%", height: 180 }}
                ></Image>
                <View
                  style={{
                    marginHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 5,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "Montserrat-SemiBold",
                        backgroundColor: '#FFFFFF',
                        color: 'black'
                      }}
                    >
                      {item.name}
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center", backgroundColor: '#FFFFFF', }}
                    >
                      <Entypo name="star" size={24} color="#C93E54" />
                      <Text style={{ color: "#C93E54" }}>{item.stars}</Text>
                      <Text
                        style={{ marginLeft: 5, color: '#808181' }}
                      >{`(${item.comments.length} valoraciones)`}</Text>
                    </View>
                  </View>
                  <MaterialIcons name="favorite" size={35} color="#C93E54" />
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.propagandaMid}>
          {propagandasMid.map((item, index) => {
            return (
              <View
                key={`propaganda-mid-${index}`}
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <Image
                  source={{ uri: item.poster }}
                  style={{ width: "100%", height: 350, borderRadius: 15 }}
                ></Image>
                <View
                  style={{
                    top: "-80%",
                    backgroundColor: "transparent",
                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      color: "white",
                      fontFamily: "Montserrat-Regular",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                      fontFamily: "Montserrat-Regular",
                    }}
                  >
                    {item.subtitle}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: '5%',
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 10,
            backgroundColor: '#FFFFFF',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              width: "70%",
              color: "#434445",
              fontFamily: "Montserrat-SemiBold",
            }}
          >
            Restaurantes populares cerca de ti
          </Text>
          <Text
            style={{
              color: "#C93E54",
              fontSize: 15,
              width: "25%",
              fontFamily: "Montserrat-Regular",
            }}
          >
            Ver todos
          </Text>
        </View>
        <View style={styles.youMayAlsoLike}>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            loop={true}
            width={340}
            height={620}
            autoplay
            onIndexChanged={(index: number) => {
              console.log("Swiper index changed: ", index);
              if (index >= 0) {
                // setCurrentIndex(index);
              }
            }}
            dot={<View></View>}
            activeDot={<View></View>}
          >
            {restaurantsNew.map((item, index) => {
              return (
                <View key={`restaurant-new-${index}`} style={styles.slide}>
                  <Image
                    source={{ uri: item.images.length ? item.images[0] : "" }}
                    style={{
                      width: 250,
                      height: 120,
                      resizeMode: "stretch",
                      borderRadius: 15,
                    }}
                  ></Image>
                  <View style={{ backgroundColor: '#FFFFFF', }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "Montserrat-SemiBold",
                        color: '#434445'
                      }}
                    >
                      {item.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 1,
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <Entypo name="star" size={20} color="#C93E54" />
                      <Text style={{ color: "#C93E54" }}>{item.stars}</Text>
                      <Text
                        style={{ marginLeft: 5, color: '#757677' }}
                      >{`(${item.comments.length} valoraciones)`}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </Swiper>
        </View>
        <View style={styles.goBackPreBuy}>
          <View
            style={{
              flexDirection: "row",
              // marginHorizontal: 10,
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 10,
              backgroundColor: '#FFFFFF',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                width: "70%",
                color: "#434445",
                fontFamily: "Montserrat-SemiBold",
              }}
            >
              Sumérgete de nuevo en tus últimas experiencias
            </Text>
            <Text
              style={{
                color: "#C93E54",
                fontSize: 15,
                width: "25%",
                fontFamily: "Montserrat-Regular",
              }}
            >
              Ver todos
            </Text>
          </View>
          {restaurantsBack.map((item, index) => {
            return (
              <View
                key={`restaurant-goback-${index}`}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 10,
                  backgroundColor: '#FFFFFF',
                }}
              >
                <Image
                  source={{ uri: item.images.length ? item.images[0] : "" }}
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: "stretch",
                    borderRadius: 5,
                  }}
                ></Image>
                <View style={{backgroundColor: '#FFFFFF',}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Montserrat-SemiBold",
                      color: '#434445'
                    }}
                  >
                    {item.name}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: '#FFFFFF', }}>
                    <Entypo name="star" size={20} color="#C93E54" />
                    <Text style={{ color: "#C93E54" }}>{item.stars}</Text>
                    <Text
                      style={{ marginLeft: 5, color: '#757677' }}
                    >{`(${item.comments.length} valoraciones)`}</Text>
                  </View>
                </View>
                <MaterialIcons name="favorite" size={35} color="#C93E54" />
              </View>
            );
          })}
        </View>
        <View style={styles.PropagandaBottom}>
        {propagandasBottom.map((item, index) => {
            return (
              <View
                key={`propaganda-bottom-${index}`}
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <Image
                  source={{ uri: item.poster }}
                  style={{ width: "100%", height: 350, borderRadius: 15 }}
                ></Image>
                <View
                  style={{
                    top: "-80%",
                    backgroundColor: "transparent",
                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      color: "white",
                      fontFamily: "Montserrat-Regular",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                      fontFamily: "Montserrat-Regular",
                    }}
                  >
                    {item.subtitle}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const StartRecipeScreen = ({ route, navigation }: StartScreenProps<'StartRecipeScreen'>) => {
  const { id }:{id: number|undefined} = route.params;

  return (
    <View style={{marginTop: 200}}>
      <Text style={{fontSize: 45, fontWeight: 'bold'}}>Receipe</Text>
      <Text>{`Recipe for restaurant ${id}`}</Text>
      <Button
          title="Go to Order"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.getParent()?.navigate('Order')
            // navigation.navigate("StartRecipeScreen", {
            //   id: 2,
            // });
          }} />
    </View>
  );
};

const StartCommentScreen = ({ route, navigation }: StartScreenProps<'StartCommentScreen'>) => {
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
        options={{ headerShown: false }}
      />
      <StartStack.Screen
        name="StartRecipeScreen"
        component={StartRecipeScreen}
        initialParams={{ id: undefined }}
        options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: '' }}
      />
      <StartStack.Screen
        name="StartCommentScreen"
        component={StartCommentScreen}
        initialParams={{ id: undefined }}
        options={{ headerShown: false }}
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
    backgroundColor: 'white'
  },
  search: {
    backgroundColor: 'white',
  },
  popularRestaurant: {
    backgroundColor: '#FFFFFF',
  },
  propagandaMid: {
    marginTop: 20,
    marginHorizontal: '5%',
    backgroundColor: '#FFFFFF',
  },
  youMayAlsoLike: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: '8%',
    height: 180,
    width: '68%',
    // backgroundColor: 'green'
  },
  wrapper: {
    // borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  slide: {
    // flex: 1,
    // width: 250,
    // height: 125,
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  goBackPreBuy: {
    marginVertical: 10,
    marginHorizontal: '5%',
    backgroundColor: '#FFFFFF',
  },
  PropagandaBottom: {
    marginHorizontal: '5%',
    backgroundColor: '#FFFFFF',
    marginTop: 20,
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
    backgroundColor: '#EEEEEE',
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
    backgroundColor: '#EEEEEE',
  },
});
