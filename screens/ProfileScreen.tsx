import { Pressable, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, AntDesign, Fontisto, Entypo, SimpleLineIcons, Octicons } from '@expo/vector-icons';
import User from '../model/users';
import Restaurant from '../model/restaurant';
import Comment from '../model/comment';
import type { RootState } from '../data/store';
import { Text, View } from '../components/Themed';
import { useSelector } from 'react-redux';
import { RootTabProfileScreenProps } from '../types';
import { useState, useEffect } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import { FlatList } from 'react-native-gesture-handler';

type FollowedRestaurant = {
  id: number;
  name: string;
  avatar: string;
}

type RestaurantBlog = {
  id: number;
  images: string[];
  restaurant: number;
  author: number;
}

export default function ProfileScreen({ route, navigation }: RootTabProfileScreenProps) {
  const insets = useSafeAreaInsets();

  //TODO: Use real authenticated user
  // const user = useSelector((state: RootState) => state.kellner.loginState.user);
  const user = useSelector((state: RootState) => state.kellner.users[0]);
  const allRestaurants: Restaurant[] = useSelector((state: RootState) => state.kellner.restaurants);
  const allUsers: User[] = useSelector((state: RootState) => state.kellner.users);
  const allComments: Comment[] = useSelector((state: RootState) => state.kellner.comments);
  const [followedRestaurants, setFollowedRestaurants] = useState<FollowedRestaurant[]>([]);
  const [recmUserAccounts, setRecmUserAccounts] = useState<User[]>();
  const [accountsListExpanded, setAccountsListExpanded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [myRestaurantBlog, setMyRestaurantBlog] = useState<RestaurantBlog[]>([]);
  const [myComments, setMyComments] = useState<Comment[]>([]);

  const getUserName = (id: number): string => {
    const user: User|undefined = allUsers.find((e) => e.id === id);

    if (!user || !user.display_name) {
      return '';
    }
    return user.display_name;
  };
  const getUserAvatar = (id: number): string|null => {
    const user: User|undefined = allUsers.find((e) => e.id === id);

    if (!user || !user.avatar) {
      return '';
    }
    return user.avatar;
  }
  const getRestaurantCity = (id: number): string => {
    //TODO: Use real city
    return 'Alicante';
  };
  const getRestaurantName = (id: number): string => {
    const restaurant: Restaurant|undefined = allRestaurants.find((e) => e.id === id);

    if (!restaurant || !restaurant.name) {
      return '';
    }
    return restaurant.name;
  };
  const getRestaurantLogo = (id: number): string|null => {
    const restaurant: Restaurant|undefined = allRestaurants.find((e) => e.id === id);

    if (!restaurant || !restaurant.logo) {
      return null;
    }
    return restaurant.logo;
  };
  const getRestaurantReviews = (id: number): number => {
    return 2344;
  };
  const getRestaurantFollowers = (id: number): number => {
    return 100;
  };
  const getBlogRestaurantImage = (id: number): string|null => {
    const blog: RestaurantBlog|undefined = myRestaurantBlog.find((e) => e.id === id);
    if (!blog || blog.images.length <= 0) {
      return null;
    }

    return blog.images[0];
  };


  useEffect(() => {
    setTimeout(() => {
      setFollowedRestaurants([
        {
          id: 0,
          name: 'Bar Italia',
          avatar: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fcomment-image-4.png?alt=media&token=60225c2d-1c41-49a9-a03b-23e4a732fa8e'
        },
        {
          id: 1,
          name: 'Villajoyosa',
          avatar: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fvillajoyosa.png?alt=media&token=058cd414-6e2b-4d48-b755-95f07e05e735'
        },
        {
          id: 2,
          name: 'UK',
          avatar: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fuk.png?alt=media&token=32ed3572-5b08-43c0-898a-1b6dcf89425a'
        },
      ]);
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setRecmUserAccounts([
        {
          id: 1,
          email: 'ivan@kellner.com',
          display_name: 'Iván Navalón',
          reviews: [0, 3, 5, 7],
          follows: [0, 1, 2, 3],
          avatar: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Favatar-ivan.png?alt=media&token=bb104efb-5643-420c-b2d4-3d51409d96af',
          verified: true,
          phone: '+1-1234567890',
        },
        {
          id: 2,
          display_name: 'Guillermo Megías',
          email: 'guillermo@kellner.com',
          reviews: [0, 3, 5, 7, 10],
          follows: [2, 5, 8, 11, 15],
          verified: true,
          avatar: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Favatar-guillermo.png?alt=media&token=0f58910d-febe-4a73-96a6-199c0ba45c25',
          phone: '+1-1234567890',
        },
        {
          id: 3,
          display_name: 'Pablo J. Garzo',
          email: 'pablo@kellner.com',
          reviews: [0, 3, 5, 7, 10],
          follows: [2, 5, 8, 11, 15],
          verified: true,
          avatar: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Favatar_pablo.jpeg?alt=media&token=d0d20449-4499-4013-802e-bc493b0f312c',
          phone: '+1-1234567890',
        },
      ]);
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMyRestaurantBlog([
        {
          id: 0,
          images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fshare_bar_italia.png?alt=media&token=35327414-af6d-4635-a528-f04541f4dc0f'],
          restaurant: 0,
          author: 0,
        },
        {
          id: 1,
          images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fshare_bar_italia.png?alt=media&token=35327414-af6d-4635-a528-f04541f4dc0f'],
          restaurant: 1,
          author: 1,
        },
      ]);
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const myComments: Comment[] = allComments.filter(item => item.author_id === user.id);
      setMyComments(myComments);
    }, 500);
  }, []);

  return user ? (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <View></View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Montserrat-SemiBold",
              color: "black",
            }}
          >
            {user.display_name}
          </Text>
          <Feather name="more-horizontal" size={30} color="black" />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Montserrat-Regular",
            }}
          >{`Alicante`}</Text>
          <Avatar.Image
            source={
              user.avatar
                ? { uri: user.avatar }
                : require("../assets/images/icon.png")
            }
            size={100}
            style={{
              marginVertical: 10,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Montserrat-SemiBold",
              }}
            >
              57
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Montserrat-Regular",
              }}
            >
              Reseñas
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Montserrat-SemiBold",
              }}
            >
              100
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Montserrat-Regular",
              }}
            >
              Seguidores
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Montserrat-SemiBold",
              }}
            >
              257
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Montserrat-Regular",
              }}
            >
              Seguidores
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#BE384C",
              borderRadius: 8,
              height: 42,
              width: "35%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontFamily: "Montserrat-Regular",
              }}
            >
              Seguir
            </Text>
          </Pressable>
          <Pressable
            style={{
              borderRadius: 8,
              height: 42,
              width: "45%",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#BE384C",
              marginLeft: 15,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Montserrat-Regular",
                color: "#BE384C",
              }}
            >
              Favoritos
            </Text>
          </Pressable>
          <Pressable
            style={{
              borderRadius: 8,
              height: 42,
              width: "12%",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#BE384C",
              marginLeft: 10,
            }}
            onPress={() => {
              setAccountsListExpanded(!accountsListExpanded);
            }}
          >
            <AntDesign name={accountsListExpanded ? "up": "down"} size={24} color="#BE384C" />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <FlatGrid
          itemDimension={70}
          data={followedRestaurants}
          adjustGridToStyles={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                console.log("followed restaurant clicked");
              }}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Avatar.Image
                  source={
                    item.avatar
                      ? { uri: item.avatar }
                      : require("../assets/images/icon.png")
                  }
                  size={70}
                />
                <Text style={{ marginTop: 5 }}>{item.name}</Text>
              </View>
            </Pressable>
          )}
        />
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 2,
          }}
        >
          <Pressable
            onPress={() => {
              setActiveTab(0);
            }}
            style={{
              // backgroundColor: 'blue',
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
              borderBottomWidth: activeTab == 0 ? 2 : 0,
              height: 45,
            }}
          >
            <Fontisto name="nav-icon-grid" size={30} color="#636363" />
          </Pressable>
          <Pressable
            onPress={() => {
              setActiveTab(1);
            }}
            style={{
              // backgroundColor: 'red',
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
              borderBottomWidth: activeTab == 1 ? 2 : 0,
            }}
          >
            <View
              style={{
                height: 35,
                width: 100,
                borderWidth: activeTab == 1 ? 0 : 2,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                backgroundColor: activeTab == 1 ? '#636363' : 'white'
              }}
            >
              {
                activeTab == 1 ? <Octicons name="star-fill" size={35} color="white" /> :
                <SimpleLineIcons name="star" size={30} color="#636363" />
              }
              {
                activeTab == 1 ? <Feather name="more-horizontal" size={35} color={ "white"} /> :
                <Feather name="more-horizontal" size={35} color={ "#636363"} />
              }
            </View>
          </Pressable>
        </View>
        {activeTab === 0 ? (
          <View
            style={{
              marginHorizontal: 5,
            }}
          >
            <FlatList
              data={myRestaurantBlog}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    marginVertical: 5,
                    height: 470,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      height: 70,
                    }}
                  >
                    <Avatar.Image
                      source={
                        getUserAvatar(user.id)
                          ? { uri: getUserAvatar(user.id) }
                          : require("../assets/images/logo.png")
                      }
                    />
                    <View
                      style={{
                        alignItems: "flex-start",
                        justifyContent: "center",
                        flex: 0,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: "Montserrat-SemiBold",
                        }}
                      >
                        {user.display_name}
                      </Text>
                      <Text
                        style={{
                          color: "#A8A9A9",
                        }}
                      >{`${getRestaurantName(
                        item.restaurant
                      )} | ${getRestaurantCity(item.restaurant)}`}</Text>
                    </View>
                  </View>
                  <Image
                    source={
                      getBlogRestaurantImage(item.id)
                        ? { uri: getBlogRestaurantImage(item.id) }
                        : require("../assets/images/logo.png")
                    }
                    style={{
                      width: "100%",
                      height: 400,
                    }}
                  />
                </View>
              )}
              keyExtractor={(item, index) => `followed-restaurant-${index}`}
            />
          </View>
        ) : null}
        {activeTab === 1 ? (
          <View
            style={{
              marginHorizontal: 5,
            }}
          >
            <FlatList
              data={myComments}
              renderItem={({ item }) => (
                <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{
                      flexDirection: 'row'
                    }}>
                      <Avatar.Image
                      size={60}
                      source={
                        getRestaurantLogo(item.restaurant_id)
                          ? { uri: getRestaurantLogo(item.restaurant_id) }
                          : require("../assets/images/icon.png")
                      }
                    />
                    <View style={{
                      marginLeft: 10
                    }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: "Montserrat-Regular",
                        }}
                      >
                        {getRestaurantName(item.restaurant_id)}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Montserrat-Regular",
                          color: "#808181",
                        }}
                      >{`${getRestaurantReviews(item.restaurant_id)} valoraciones`}</Text>
                      <Text
                        style={{
                          fontFamily: "Montserrat-Regular",
                          color: "#808181",
                        }}
                      >{`${getRestaurantFollowers(item.restaurant_id)} seguidores`}</Text>
                    </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        borderRadius: 25,
                        borderWidth: 1,
                        borderColor: "#C93E54",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "20%",
                        height: 30,
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
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
                        source={{ uri: image_uri.item }}
                        style={{ width: 70, height: 70, resizeMode: "stretch" }}
                      />
                    )}
                  />
                </View>
              )}
              keyExtractor={(item) => `my-comment-${item.id}`}
            />
          </View>
        ) : null}
      </View>
    </View>
  ) : (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text
        style={{
          fontSize: 25,
          fontFamily: "Montserrat-SemiBold",
          color: "#C93E54",
        }}
      >
        Por favor, registrese
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#C93E54',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 5,
    height: 2,
    width: '100%',
  },
});
