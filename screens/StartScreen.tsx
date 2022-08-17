import { StyleSheet, TextInput, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from '../components/Themed';
import { RootTabStartScreenProps, StartStackParamList, StartScreenProps } from '../types';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootState } from '../data/store';
import { useSelector } from 'react-redux';
import { Feather, Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Swiper from 'react-native-swiper';
import { Avatar } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';

import Restaurant from '../model/restaurant';
import Propaganda from '../model/propaganda';
import { RouteProp } from '@react-navigation/native';
import Recipe from '../model/recipe';
import Comment from '../model/comment';
import { Currency, currencyText } from '../model/enums';

const StartStack = createStackNavigator<StartStackParamList>();

const RecipeHeaderLeft = (props: {
  title: string | undefined;
  logo: string | undefined;
  stars: number | undefined;
  comments_len: number | undefined;
  navigation: any;
}) => {
  const {title, logo, stars, comments_len, navigation} = props;
  console.log('RecipeHeaderLeft: ', props);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <AntDesign
        name="left"
        size={30}
        color="black"
        onPress={() => {
          console.log("Go back home...");
          navigation.goBack();
        }}
      />
      <Avatar.Image
        size={35}
        source={logo ? { uri: logo } : require("../assets/images/icon.png")}
        style={{ marginLeft: 10 }}
      />
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
          backgroundColor: "#FFFFFF",
        }}
      >
        <View style={{backgroundColor: '#FFFFFF'}}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Montserrat-SemiBold",
              backgroundColor: "#FFFFFF",
              color: "black",
            }}
          >
            {title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Entypo name="star" size={24} color="#C93E54" />
            <Text style={{ color: "#C93E54" }}>{stars}</Text>
            <Text
              style={{ marginLeft: 5, color: "#808181" }}
            >{`(${comments_len} valoraciones)`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const RecipeHeaderRight = (props: {
  restaurant_id: number|undefined,
}) => {
  const { restaurant_id } = props;
  console.log('RecipeHeaderRight: ', props);

  //Search icon: Search items in the restaurant specified with its id
  const onSearchRecipe = () => {
    //Jump to the search screen (still within in this stack), which showing search bar, search result list view
    //Navigae.navigate('SearchRecipeScreen', {restaurant_id: restaurant_id});
  };

  //Favorite: mark this restaurant with the id as favorite one for the current logined user
  const markFavorite = () => {
    //Update the favorite flag for this restaurant
    //Axios.patch('/restaurants/${restaurant_id}', { favorite: true });
  };

  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      marginRight: 10,
    }}>
      <Feather
        name="search"
        size={30}
        color="#7C7D7E"
        style={{marginRight: 15}}
      />
      <MaterialIcons name="favorite-outline" size={30} color="#C93E54" />
    </View>
  );
};

const StartHomeScreen = ({ route, navigation }: StartScreenProps<'StartHomeScreen'>) => {
  const insets = useSafeAreaInsets();
  const loginState = useSelector((state: RootState) => state.kellner.loginState);
  // const [searchQuery, setSearchQuery] = useState<string>('');
  // const onChangeSearch = (query: string) => {
  //   setSearchQuery(query);
  //   console.log('Jumping from search bar to search page ...');
  //   navigation.getParent()?.navigate('Order');
  // };
  const [restaurantsNearby, setRestaurantsNearby] = useState<Restaurant[]>([
    {
      id: 0,
      name: 'Bar Italia',
      loc: [105.32, 56.75],
      recips: [0, 1, 2],
      images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-restaurants-2.png?alt=media&token=36873756-2d2d-4f16-8133-233980503556'],
      logo: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-restaurant-logo-italybar.png?alt=media&token=a2ca97f6-9f39-4d7a-9664-c11fcc3741df',
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
            {loginState.user?.display_name ? loginState.user?.display_name : "Guest"}
          </Text>
        </View>
        <View style={{ backgroundColor: "white" }}>
          <Feather name="camera" size={34} color="#707070" />
        </View>
      </View>
      <View style={styles.search}>
        <TouchableOpacity onPress={() => {
          console.log('Jumping from search bar to search page ...');
          navigation.getParent()?.navigate('Order');
        }}>
          <View style={styles.inputContainer}>
            <Feather
              name="search"
              size={24}
              color="#7C7D7E"
              style={styles.inputPrefix}
            />
            <Text style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 20,
              marginLeft: 5,
              color: '#A8A9A9'
            }}>
              Buscar restaurante
            </Text>
            {/* <TextInput
              secureTextEntry={false}
              onChangeText={onChangeSearch}
              value={searchQuery}
              placeholder="Buscar restaurante"
              keyboardType="default"
              allowFontScaling={true}
              style={styles.input}
            /> */}
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.popularRestaurant}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              alignItems: "baseline",
              marginBottom: 10,
              backgroundColor: "#FFFFFF",
              justifyContent: "space-between",
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
              onPress={() => {
                console.log("Loading more latest popular restaurants ...");
              }}
            >
              Ver todos
            </Text>
          </View>
          {restaurantsNearby.map((item, index) => {
            return (
              <View
                key={`restaurant-nearby-${index}`}
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <TouchableOpacity
                  onPress={() => {
                    console.log(
                      "Jump to recipe page for this restaurant with id: ",
                      item.id
                    );
                    navigation.navigate("StartRecipeScreen", {
                      restaurant_id: item.id,
                      restaurant_name: item.name,
                      restaurant_logo: item.logo,
                      restaurant_stars: item.stars,
                      restaurant_comments_len: item.comments.length,
                    });
                  }}
                >
                  <Image
                    source={{ uri: item.images.length ? item.images[0] : "" }}
                    style={{ width: "100%", height: 180 }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    marginHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 5,
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "Montserrat-SemiBold",
                        backgroundColor: "#FFFFFF",
                        color: "black",
                      }}
                    >
                      {item.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <Entypo name="star" size={24} color="#C93E54" />
                      <Text style={{ color: "#C93E54" }}>{item.stars}</Text>
                      <Text
                        style={{ marginLeft: 5, color: "#808181" }}
                        onPress={() => {
                          navigation.navigate("StartCommentScreen", {
                            restaurant_id: item.id,
                            restaurant_name: item.name,
                            restaurant_logo: item.logo,
                            restaurant_stars: item.stars,
                          });
                        }}
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
                style={{ backgroundColor: "#FFFFFF" }}
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
            marginHorizontal: "5%",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 10,
            backgroundColor: "#FFFFFF",
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
                  <View style={{ backgroundColor: "#FFFFFF" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "Montserrat-SemiBold",
                        color: "#434445",
                      }}
                    >
                      {item.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 1,
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <Entypo name="star" size={20} color="#C93E54" />
                      <Text style={{ color: "#C93E54" }}>{item.stars}</Text>
                      <Text
                        style={{ marginLeft: 5, color: "#757677" }}
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
              backgroundColor: "#FFFFFF",
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
                  backgroundColor: "#FFFFFF",
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
                <View style={{ backgroundColor: "#FFFFFF" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Montserrat-SemiBold",
                      color: "#434445",
                    }}
                  >
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <Entypo name="star" size={20} color="#C93E54" />
                    <Text style={{ color: "#C93E54" }}>{item.stars}</Text>
                    <Text
                      style={{ marginLeft: 5, color: "#757677" }}
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
                style={{ backgroundColor: "#FFFFFF" }}
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

const enum RecipeTabIndex {
  Start,
  First,
  Second,
  Beverage,
}

const RecipeSwipeView = (recipes: Recipe[]) => {
  return (
    <View style={styles.swiperWrapperRecipe}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={true}
        width={345}
        height={620}
        autoplay
        onIndexChanged={(index: number) => {
          if (index >= 0) {
            console.log("Index changed in popular recipe:", index);
          }
        }}
        dot={<View></View>}
        activeDot={<View></View>}
      >
        {recipes.map((item, index) => {
          return (
            <View key={`recipe-new-${index}`} style={styles.slide}>
              <View style={styles.recipeCard}>
                <View
                  style={{
                    width: 52,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FEAEBB",
                    borderTopEndRadius: 25,
                    borderTopStartRadius: 5,
                    borderBottomStartRadius: 25,
                    borderBottomEndRadius: 5,
                    marginRight: 5,
                    marginLeft: "65%",
                    marginTop: "5%",
                  }}
                >
                  <MaterialIcons name="favorite" size={20} color="white" />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Montserrat-Regular",
                    color: "#BE384C",
                    marginLeft: 10,
                    marginTop: 45,
                  }}
                >
                  {`${item.price} ${currencyText(item.currency)}`}
                </Text>
                <Text
                  style={{
                    marginVertical: 5,
                    fontSize: 20,
                    fontFamily: "Montserrat-Regular",
                    marginLeft: 10,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    marginVertical: 5,
                    fontFamily: "Montserrat-Regular",
                    fontSize: 13,
                    marginLeft: 10,
                  }}
                >
                  {item.introduction}
                </Text>
              </View>
              <Avatar.Image
                source={{ uri: item.images.length ? item.images[0] : "" }}
                size={95}
                style={{
                  // width: 110,
                  // height: 110,
                  // resizeMode: "stretch",
                  // borderRadius: 15,
                  top: -250,
                  left: -80,
                }}
              />
              {/* <View
                  style={{
                    flexDirection: "row",
                    width: "78%",
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    source={{ uri: item.images.length ? item.images[0] : "" }}
                    style={{
                      width: 110,
                      height: 110,
                      resizeMode: "stretch",
                      borderRadius: 15,
                    }}
                  />
                </View> */}
            </View>
          );
        })}
      </Swiper>
    </View>
  );
};

const StartRecipeScreen = ({ route, navigation }: StartScreenProps<'StartRecipeScreen'>) => {
  const { restaurant_id }:{restaurant_id: number|undefined} = route.params;
  const insets = useSafeAreaInsets();
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([
    {
      id: 0,
      name: "Hamburguesa pollo",
      images: [
        "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-recipe-1.png?alt=media&token=efece233-2284-4c4e-accd-8eb4b83bfca0",
      ],
      price: 30.15,
      currency: Currency.EU,
      introduction: "150 gramos de carne madurada, queso brie…",
      restaurant_id: 0,
    },
    {
      id: 1,
      name: "Ensalada frutal",
      images: [
        "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-recipe-2.png?alt=media&token=e207c83e-f003-40ef-bfa1-f224551ce31e",
      ],
      price: 18.25,
      currency: Currency.EU,
      introduction: "Aguacate, granada y maracuyá",
      restaurant_id: 0,
    },
  ]);
  const [specialRecipes, setSpecialPopularRecipes] = useState<Recipe[]>([
    {
      id: 2,
      name: "Salmon Sushi",
      images: [
        "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-recipe-4.png?alt=media&token=625b6e39-2e8e-48a7-9015-6ec2445e7445",
      ],
      price: 28.0,
      currency: Currency.EU,
      introduction: "Salmon, carlota, espinacas y tosta de pan",
      restaurant_id: 0,
    },
    {
      id: 3,
      name: "Ensalada aguaca",
      images: [
        "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-recipe-3.png?alt=media&token=9cad41d7-d778-41fe-b3d6-f71ea37e5582",
      ],
      price: 11.0,
      currency: Currency.EU,
      introduction: "Brotes verdes de lechu y aguacate",
      restaurant_id: 0,
    }
  ]);
  const [activeTab, setActiveTab] = useState<RecipeTabIndex>(RecipeTabIndex.Start);

  return (
    <View style={[styles.container, { paddingTop: insets.top, height: 850 }]}>
      <View style={styles.topTab}>
        <TouchableOpacity
          style={
            activeTab === RecipeTabIndex.Start
              ? styles.topTabItemActive
              : styles.topTabItemInactive
          }
          onPress={() => setActiveTab(RecipeTabIndex.Start)}
        >
          <Text
            style={
              activeTab === RecipeTabIndex.Start
                ? styles.topTabItemTextActive
                : styles.topTabItemTextInactive
            }
          >
            Entrantes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            activeTab === RecipeTabIndex.First
              ? styles.topTabItemActive
              : styles.topTabItemInactive
          }
          onPress={() => setActiveTab(RecipeTabIndex.First)}
        >
          <Text
            style={
              activeTab === RecipeTabIndex.First
                ? styles.topTabItemTextActive
                : styles.topTabItemTextInactive
            }
          >
            Primeros
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            activeTab === RecipeTabIndex.Second
              ? styles.topTabItemActive
              : styles.topTabItemInactive
          }
          onPress={() => setActiveTab(RecipeTabIndex.Second)}
        >
          <Text
            style={
              activeTab === RecipeTabIndex.Second
                ? styles.topTabItemTextActive
                : styles.topTabItemTextInactive
            }
          >
            Segundos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            activeTab === RecipeTabIndex.Beverage
              ? styles.topTabItemActive
              : styles.topTabItemInactive
          }
          onPress={() => setActiveTab(RecipeTabIndex.Beverage)}
        >
          <Text
            style={
              activeTab === RecipeTabIndex.Beverage
                ? styles.topTabItemTextActive
                : styles.topTabItemTextInactive
            }
          >
            Bebidas
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
          <Text style={{ fontSize: 20, fontFamily: "Montserrat-Regular" }}>
            Populares
          </Text>
          {RecipeSwipeView(popularRecipes)}
        </View>
        <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
          <Text style={{ fontSize: 20, fontFamily: "Montserrat-Regular" }}>
            Especial del mes
          </Text>
          {RecipeSwipeView(specialRecipes)}
        </View>
        <View style={{ alignItems: "flex-end", marginRight: 10, marginVertical: 10 }}>
          <TouchableOpacity
            style={{
              width: "38%",
              height: 50,
              backgroundColor: "#C93E54",
              alignItems: "center",
              justifyContent: "center",
              borderTopEndRadius: 5,
              borderTopStartRadius: 30,
              borderBottomStartRadius: 5,
              borderBottomEndRadius: 30,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontFamily: "Montserrat-Regular",
              }}
            >
              Ver todos
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const StartCommentScreen = ({ route, navigation }: StartScreenProps<'StartCommentScreen'>) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { restaurant_id }:{restaurant_id: number|undefined} = route.params;
  const insets = useSafeAreaInsets();

  const [authorsInfo, setAuthorsInfo] = useState<{
    id: number;
    name: string;
    reviews: number;
    followers: number;
    avatar?: string;
  }[]>([]);

  const loadAuthorInfo = (commentsToUpdate: Comment[]) => {
    commentsToUpdate.forEach((comment) => {
      console.log('Retrive user info for: ', comment.author_id);
    });

    //TODO: Fetch from server
    setAuthorsInfo([
      {
        id: 1,
        name: 'Iván Navalón',
        reviews: 45,
        followers: 2,
        avatar: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Favatar-ivan.png?alt=media&token=bb104efb-5643-420c-b2d4-3d51409d96af',
      },
      {
        id: 2,
        name: 'Guillermo Megías',
        reviews: 5,
        followers: 10,
        avatar: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Favatar-guillermo.png?alt=media&token=0f58910d-febe-4a73-96a6-199c0ba45c25',
      }
    ]);
  };

  useEffect(() => {
    setTimeout(() => {
      //TODO: Fetch from server
      const allComments = [
        {
          id: 0,
          author_id: 1,
          restaurant_id: 0,
          content: `Me gustó la comida del restaurante. Los platos son atractivos y muy bonitos. Buena comida, espacio lujoso y servicio entusiasta. Volveré enel…`,
          create_date: new Date("2022-05-17T03:24:00"),
          update_date: new Date("2022-05-17T03:24:00"),
          stars: 4.9,
          images:[
            'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fcomment-images-1.png?alt=media&token=8b92f38b-d5df-4597-827c-416ab30833c9',
            'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fcomment-image-2.png?alt=media&token=56d8c97c-016a-47d1-8ca2-95a5c2c09c0c',
            'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fcomment-image-3.png?alt=media&token=e797fe5e-ac8f-4d54-a9ff-41d4779fd512',
          ]
        },
        {
          id: 1,
          author_id: 2,
          restaurant_id: 1,
          content: `Me gustó la comida del restaurante. La reserva y la integración con Kellner fue maravillosa. Hicimos la reserva por la app, nos sentarnos en la mesa y pagamos al instante…`,
          create_date: new Date("2022-05-18T03:24:00"),
          update_date: new Date("2022-05-18T03:24:00"),
          stars: 4.9,
          images: [
            'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fcomment-image-4.png?alt=media&token=60225c2d-1c41-49a9-a03b-23e4a732fa8e',
            'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fcomment-image-5.png?alt=media&token=eac9c796-0932-4708-a253-d2da5b932f06',
          ]
        },
      ];
      setComments(allComments);
      loadAuthorInfo(allComments);
    }, 1000);
  }, []);

  const getAuthor = (id: number) => {
    return authorsInfo.find(e => e.id === id);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Avatar.Image
                size={40}
                source={
                  getAuthor(item.author_id)
                    ? { uri: getAuthor(item.author_id)?.avatar }
                    : require("../assets/images/icon.png")
                }
              />
              <View>
                <Text
                  style={{ fontSize: 20, fontFamily: "Montserrat-Regular" }}
                >
                  {getAuthor(item.author_id)
                    ? getAuthor(item.author_id)?.name
                    : "Guest"}
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat-Regular",
                    color: "#808181",
                  }}
                >{`${getAuthor(item.author_id)?.reviews} valoraciones | ${
                  getAuthor(item.author_id)?.followers
                } seguidores`}</Text>
              </View>
              <TouchableOpacity
                style={{
                  borderRadius: 25,
                  borderWidth: 1,
                  borderColor: "#C93E54",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "20%",
                  marginVertical: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#C93E54",
                    fontFamily: "Montserrat-Regular",
                  }}
                >
                  Seguir
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 8,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    marginRight: 5,
                    fontFamily: "Montserrat-Regular",
                    color: "#808181",
                  }}
                >
                  Valoración
                </Text>
                <Entypo name="star" size={22} color="#C93E54" />
                <Entypo name="star" size={22} color="#C93E54" />
                <Entypo name="star" size={22} color="#C93E54" />
                <Entypo name="star" size={22} color="#C93E54" />
                <Text style={{ color: "#C93E54" }}>{item.stars}</Text>
              </View>
              <Text
                style={{
                  fontFamily: "Montserrat-Regular",
                  color: "#808181",
                }}
              >
                Hace 2 días
              </Text>
            </View>
            <Text>{item.content}</Text>
            <FlatGrid
              itemDimension={70}
              keyExtractor={(image, index) => `comment-image-${index}`}
              data={item.images ? item.images : []}
              renderItem={(image_uri) => (
                <Image
                  source={{uri: image_uri.item}}
                  style={{ width: 70, height: 70, resizeMode: "stretch" }}
                />
              )}
            />
          </View>
        )}
        keyExtractor={(item) => `comments-${item.id}`}
      />
      <View
        style={{ alignItems: "flex-end", marginRight: 10, marginVertical: 10 }}
      >
        <TouchableOpacity
          style={{
            width: "38%",
            height: 50,
            backgroundColor: "#C93E54",
            alignItems: "center",
            justifyContent: "center",
            borderTopEndRadius: 5,
            borderTopStartRadius: 30,
            borderBottomStartRadius: 5,
            borderBottomEndRadius: 30,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontFamily: "Montserrat-Regular",
            }}
          >
            Leer todas
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CommentHeaderCenter = (props: {
  title: string | undefined;
  logo: string | undefined;
  stars: number | undefined;
  navigation: any;
}) => {
  const {title, logo, stars, navigation} = props;

  return (
    <View style={{ alignItems: "center", backgroundColor: '#C93E54' }}>
      <Avatar.Image
        size={35}
        source={logo ? { uri: logo } : require("../assets/images/icon.png")}
      />
      <Text
        style={{
          fontSize: 22,
          fontFamily: "Montserrat-SemiBold",
          color: 'white',
          marginVertical: 2
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: '#C93E54'
        }}
      >
        <Entypo name="star" size={24} color="white" />
        <Text style={{ color: "white" }}>{stars}</Text>
      </View>
    </View>
  );
};

const CommentHeaderLeft = (props: {
  navigation: any;
}) => {
  const {navigation} = props;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#C93E54'
      }}
    >
      <AntDesign
        name="left"
        size={30}
        color="white"
        onPress={() => {
          console.log("Go back home...");
          navigation.goBack();
        }}
      />
      <Text style={{
        color: 'white',
        fontSize: 20,
        }}>Volver</Text>
    </View>
  );
};

export default function StartScreen({ route, navigation }: RootTabStartScreenProps) {
  return (
    <StartStack.Navigator
      initialRouteName="StartHomeScreen"
      screenOptions={{
        cardStyle: {backgroundColor: 'red'}
      }}
    >
      <StartStack.Screen
        name="StartHomeScreen"
        component={StartHomeScreen}
        options={{ headerShown: false }}
      />
      <StartStack.Screen
        name="StartRecipeScreen"
        component={StartRecipeScreen}
        initialParams={{}}
        options={(recipeScreenProps: {
          route: RouteProp<StartStackParamList, "StartRecipeScreen">;
          navigation: any;
        }) => ({
          headerLeft: (recipeHeaderprops) =>
            RecipeHeaderLeft({
              title: recipeScreenProps.route.params.restaurant_name,
              logo: recipeScreenProps.route.params.restaurant_logo,
              stars: recipeScreenProps.route.params.restaurant_stars,
              comments_len:
                recipeScreenProps.route.params.restaurant_comments_len,
              navigation: navigation,
            }),
          headerRight: (recipeHeaderprops) =>
            RecipeHeaderRight({
              restaurant_id: recipeScreenProps.route.params.restaurant_id,
            }),
          title: "",
        })}
      />
      <StartStack.Screen
        name="StartCommentScreen"
        component={StartCommentScreen}
        initialParams={{}}
        options={(recipeScreenProps: {
          route: RouteProp<StartStackParamList, "StartCommentScreen">;
          navigation: any;
        }) => ({
          headerLeft: (commentHeaderprops) =>
          CommentHeaderLeft({
              navigation: navigation,
            }),
          title: "",
          headerTitle: (commentHeaderprops) => CommentHeaderCenter({
            title: recipeScreenProps.route.params.restaurant_name,
            logo: recipeScreenProps.route.params.restaurant_logo,
            stars: recipeScreenProps.route.params.restaurant_stars,
            navigation: navigation,
          }),
          headerStyle: {backgroundColor: '#C93E54', height: 155},
          headerTitleAlign: 'center',
        })}
      />
      {/* <StartStack.Screen
        name="StartRecipeSearchScreen"
        component={StartRecipeSearchScreen}
        initialParams={{ id: undefined }}
        options={{ headerShown: false }}
      /> */}
    </StartStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#FFFFFF",
  },
  greeting: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  search: {
    backgroundColor: "white",
  },
  popularRestaurant: {
    backgroundColor: "#FFFFFF",
  },
  propagandaMid: {
    marginTop: 20,
    marginHorizontal: "5%",
    backgroundColor: "#FFFFFF",
  },
  youMayAlsoLike: {
    marginHorizontal: "8%",
    height: 180,
    width: "68%",
  },
  swiperWrapperRecipe: {
    marginHorizontal: "5%",
    height: 280,
    width: '68%',
  },
  wrapper: {
    backgroundColor: "#FFFFFF",
  },
  slide: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
  },
  recipeCard: {
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5.32,
    borderRadius: 15,
    height: 220,
    width: '70%',
    elevation: 7,
  },
  goBackPreBuy: {
    marginVertical: 10,
    marginHorizontal: "5%",
    backgroundColor: "#FFFFFF",
  },
  PropagandaBottom: {
    marginHorizontal: "5%",
    backgroundColor: "#FFFFFF",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 50,
    height: 60,
    margin: 12,
    padding: 10,
    fontSize: 20,
    backgroundColor: "#EEEEEE",
  },
  inputPrefix: {
    paddingHorizontal: 5,
    fontSize: 25,
    color: "#9AAAAA",
  },
  input: {
    width: "80%",
    fontSize: 20,
    paddingLeft: 10,
    fontFamily: "Montserrat-Regular",
    backgroundColor: "#EEEEEE",
  },
  topTab: {
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  topTabItemActive: {
    width: 92,
    height: 35,
    backgroundColor: "#FEAEBB",
    alignItems: "center",
    justifyContent: "center",
    borderTopEndRadius: 5,
    borderTopStartRadius: 25,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 25,
  },
  topTabItemInactive: {
    width: 92,
    height: 35,
    // backgroundColor: '#FEAEBB',
    alignItems: "center",
    justifyContent: "center",
    // borderTopEndRadius: 5,
    // borderTopStartRadius: 25,
    // borderBottomStartRadius: 5,
    // borderBottomEndRadius: 25,
  },
  topTabItemTextActive: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: "#BE384C",
  },
  topTabItemTextInactive: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: "black",
  },
});
