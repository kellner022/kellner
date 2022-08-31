import { StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from '../components/Themed';
import type { RootState } from '../data/store';
import { RootTabOrderScreenProps, OrderStackParamList, OrderScreenProps } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from 'react-native-paper';
import { Feather, Entypo, MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import Order from '../model/order';
import { useSelector, useDispatch } from 'react-redux';
import Restaurant from '../model/restaurant';

const OrderStack = createStackNavigator<OrderStackParamList>();

const OrderHomeScreen = ({ route, navigation }: OrderScreenProps<'OrderHomeScreen'>) => {
  const insets = useSafeAreaInsets();
  const orders = useSelector((state: RootState) => state.kellner.orders);

  const [restaurantInfo, setRestaurantInfo] = useState<Restaurant[]>([]);

  const loadRestaurantInfo = (ordersToUpdate: Order[]) => {
    ordersToUpdate.forEach((order) => {
      console.log("Retrive restaurant info for order: ", order.id);
    });

    //TODO: Fetch from server
    setRestaurantInfo([
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
  };

  useEffect(() => {
    setTimeout(() => {
      //TODO: Fetch from server
      loadRestaurantInfo(orders);
    }, 1000);
  }, []);

  const getRestaurant = (id: number) => {
    return restaurantInfo.find((e) => e.id === id);
  };

  const restaurantLogoUri = (id: number): string|undefined => {
    const restaurant:Restaurant|undefined = getRestaurant(id);

    if (restaurant) {
      return restaurant.logo;
    }
    return undefined;
  };

  const restaurantName = (id: number): string|undefined => {
    const restaurant:Restaurant|undefined = getRestaurant(id);

    if (restaurant) {
      return restaurant.name;
    }
    return undefined;
  };

  const restaurantStars = (id: number): number|undefined => {
    const restaurant:Restaurant|undefined = getRestaurant(id);

    if (restaurant) {
      return restaurant.stars;
    }
    return undefined;
  };

  const orderRecipeCover = (id: number): string|undefined => {
    const order: Order|undefined = orders.find((e) => e.id === id);

    if (!order) {
      return undefined;
    }

    if (order.recipes.length <= 0) {
      return undefined;
    }

    const recipeId = order.recipes[0].recipe_id;

    //TODO, search the recipe with this ID in the entire list of recipes

    return 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-recipe-1.png?alt=media&token=efece233-2284-4c4e-accd-8eb4b83bfca0';
  };

  const orderTotalPrice = (id: number): number => {

    return 0;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {orders.length === 0 ? (
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: "Montserrat-SemiBold",
              color: "#C93E54",
            }}
          >
            Aún no tienes ningún pedido ~~
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <Pressable onPress={() => {
              console.log('Jump to checkout poage in order tab');
              navigation.navigate("OrderCheckoutScreen", {
                order_id: item.id,
              });
            }}>
              <View
                style={{
                  marginVertical: 10,
                  height: 90,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 10,
                  backgroundColor: "#FEAEBB",
                  // borderWidth: 1,

                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.44,
                  shadowRadius: 5.32,
                  elevation: 7,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <Avatar.Image
                    size={35}
                    source={
                      restaurantLogoUri(item.restaurants_id)
                        ? { uri: restaurantLogoUri(item.restaurants_id) }
                        : require("../assets/images/icon.png")
                    }
                    style={{ marginLeft: 10 }}
                  />
                  <View
                    style={{
                      marginLeft: 10,
                      marginVertical: 5,
                      backgroundColor: "transparent",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "Montserrat-SemiBold",
                        color: "black",
                      }}
                    >
                      {restaurantName(item.restaurants_id)}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Entypo name="star" size={24} color="#C93E54" />
                      <Text style={{ color: "#C93E54" }}>
                        {restaurantStars(item.restaurants_id)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 25,
                  }}
                >
                  <Avatar.Image
                    size={60}
                    source={
                      orderRecipeCover(item.id)
                        ? { uri: orderRecipeCover(item.id) }
                        : require("../assets/images/logo.png")
                    }
                    style={{ marginLeft: 10 }}
                  />
                </View>

                <View
                  style={{
                    marginHorizontal: 10,
                    backgroundColor: "transparent",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat-Regular",
                      color: "#808181",
                    }}
                  >
                    {`${item.recipes.length}x Recipes`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Montserrat-Regular",
                      color: "#BE384C",
                    }}
                  >
                    {`Total: 83.50 €`}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => `order-${item.id}`}
        />
      )}
    </View>
  );
};

const OrderCheckoutScreen = ({ route, navigation }: OrderScreenProps<'OrderCheckoutScreen'>) => {
  const insets = useSafeAreaInsets();
  const loginState = useSelector((state: RootState) => state.kellner.loginState);
  const { order_id }:{order_id: number|undefined} = route.params;

  console.log('order_id:', order_id);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={{flexDirection: 'row'}}>
        {
          // Header
        }
      </View>
      <View>
        {
          // Recipe Items
        }
      </View>
      <View>
        {
          // Notes
        }
      </View>
      <View>
        {
          // Total and submit
        }
      </View>
    </View>
  );
};

const OrderPaymentScreen = ({ route, navigation }: OrderScreenProps<'OrderPaymentScreen'>) => {
  const insets = useSafeAreaInsets();
  const loginState = useSelector((state: RootState) => state.kellner.loginState);
  const { order_id }:{order_id: number|undefined} = route.params;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text>Payment</Text>
    </View>
  );
};

const OrderHeaderLeft = (props: {
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

export default function OrderScreen({ route, navigation }: RootTabOrderScreenProps) {
  return (
    <OrderStack.Navigator
      initialRouteName="OrderHomeScreen"
      screenOptions={{
        cardStyle: { backgroundColor: "red" },
      }}
    >
      <OrderStack.Screen
        name="OrderHomeScreen"
        component={OrderHomeScreen}
        options={{ headerShown: false }}
      />
      <OrderStack.Screen
        name="OrderCheckoutScreen"
        component={OrderCheckoutScreen}
        initialParams={{}}
        options={() => ({
          headerTitle: "",
          headerBackTitle: "Mi pedido",
          headerBackTitleStyle: {
            color: "black",
            fontSize: 25,
            fontFamily: "Montserrat-SemiBold",
          },
          headerBackImage: () => (
            <AntDesign name="left" size={30} color="black" />
          ),
        })}
      />
      <OrderStack.Screen
        name="OrderPaymentScreen"
        component={OrderPaymentScreen}
        initialParams={{}}
        options={(orderScreenProps: {
          route: RouteProp<OrderStackParamList, "OrderPaymentScreen">;
          navigation: any;
        }) => ({
          headerLeft: (orderHeaderprops) =>
            OrderHeaderLeft({
              navigation: navigation,
            }),
          title: "",
          headerStyle: { backgroundColor: "#C93E54", height: 155 },
          headerTitleAlign: "center",
        })}
      />
    </OrderStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#C93E54',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
