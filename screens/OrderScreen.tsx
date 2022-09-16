import { StyleSheet, FlatList, ImageBackground, Pressable, TouchableOpacity, ScrollView, Image, } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from '../components/Themed';
import type { RootState } from '../data/store';
import { RootTabOrderScreenProps, OrderStackParamList, OrderScreenProps } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, Button } from 'react-native-paper';
import { FontAwesome5, Entypo, MaterialIcons, AntDesign, FontAwesome, Fontisto } from '@expo/vector-icons';
import Order, { RecipeItem } from '../model/order';
import { useSelector } from 'react-redux';
import Restaurant from '../model/restaurant';
import Recipe from '../model/recipe';
import { Currency, currencyText, PaymentMethod } from '../model/enums';

type OrderRecipeItem = {
  item: RecipeItem;
  info: Recipe|undefined;
}

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
    }, 500);
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
  const orders: Order[] = useSelector((state: RootState) => state.kellner.orders);
  const allRestaurants: Restaurant[] = useSelector((state: RootState) => state.kellner.restaurants);
  const allRecipes: Recipe[] = useSelector((state: RootState) => state.kellner.recipes);
  const { order_id }:{order_id: number|undefined} = route.params;
  const [dinners, setDinners] = useState<number>(1);

  const order = orders.find((e) => e.id === order_id);
  console.log('order checkout:', order);

  const [orderRestaurant, setOrderRestaurant] = useState<Restaurant>();
  //Here we must define a function to get the list because it may change later
  const recipeItemListFromOrder = (inOrder: Order) => {
    const inOrderRecipes: OrderRecipeItem[]|undefined =  inOrder?.recipes.map(
      (r) => {
        const recipeInfo = allRecipes.find(e => e.id === r.recipe_id)
        const orderRecipe: OrderRecipeItem = {
          item: r,
          info: recipeInfo,
        };
        return orderRecipe;
      }
    );

    return inOrderRecipes ? inOrderRecipes : [];
  };

  const getTotalCost = () => {
    if (!order) {
      return '';
    }
    const list = recipeItemListFromOrder(order);
    if (list.length <= 0) {
      return '';
    }

    let total = 0.0;
    let currency = list[0].info ? list[0].info.currency : Currency.EU;
    const initVal = {
      val: 0.0
    };
    const sumCost = list.reduce((pre, current: OrderRecipeItem) => {
      if (current.info) {
        return {val: (pre.val + current.info?.price * current.item.quantity)};
      }
      else {
        return {val: pre.val};
      }
    }, initVal);
    total = sumCost.val;

    return `${total}${currencyText(currency)}`
  };

  const getCostPerDinner = () => {
    if (!order) {
      return '';
    }
    const list = recipeItemListFromOrder(order);
    if (list.length <= 0) {
      return '';
    }

    let total = 0.0;
    let currency = list[0].info ? list[0].info.currency : Currency.EU;
    const initVal = {
      val: 0.0
    };
    const sumCost = list.reduce((pre, current: OrderRecipeItem) => {
      if (current.info) {
        return {val: (pre.val + current.info?.price * current.item.quantity)};
      }
      else {
        return {val: pre.val};
      }
    }, initVal);
    total = sumCost.val;

    return `${(total/dinners).toFixed(2)}${currencyText(currency)}`
  };

  //Restaurant info, this is Okay, because we will not change this once created
  useEffect(() => {
    //axios.get(https://www.firebase.com/kellner/api/v1/restaurant/1)
    //.then((resp) => {
    // setRestaurant(resp.data);
    //})
    //.catch(err => {
    // console.err('Oh no, failed to fetch restaurant info from server');
    //});
    setTimeout(() => {
      const restaurant = allRestaurants.find((e) => e.id === order?.restaurants_id);
      if (restaurant) {
        setOrderRestaurant(restaurant);
      }
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {orderRestaurant ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Avatar.Image
                size={85}
                source={
                  orderRestaurant.logo
                    ? { uri: orderRestaurant.logo }
                    : require("../assets/images/logo.png")
                }
                style={{ marginLeft: 10 }}
              />
              <View
                style={{
                  alignItems: "flex-start",
                  justifyContent: "center",
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: "#434445",
                    fontSize: 22,
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >
                  {orderRestaurant.name}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="map-marker" size={24} color="#BE384C" />
                  <Text
                    style={{
                      marginLeft: 2,
                      color: "#B6B7B7",
                    }}
                  >
                    {orderRestaurant.address.substring(0, 21)}
                  </Text>
                </View>
              </View>
            </View>
            <MaterialIcons name="favorite" size={35} color="#BE384C" />
          </View>
        ) : (
          <View></View>
        )}
        <View>
          {order ? (
            <View
              style={{
                backgroundColor: "#F3F3F3",
                marginTop: 20,
              }}
            >
              {recipeItemListFromOrder(order).map((item, index) => (
                <View
                  key={`order-recipe-${item.item.recipe_id}-${index}`}
                  style={{
                    borderTopWidth: index !== 0 ? 1 : 0,
                    borderTopColor: "#E2E2E2",
                    justifyContent: "space-between",
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    height: 55,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#434445",
                      fontSize: 18,
                      fontFamily: "Montserrat-Regular",
                    }}
                  >{`${item.info?.name} x${item.item.quantity}`}</Text>
                  <Text
                    style={{
                      color: "#434445",
                      fontSize: 20,
                      fontFamily: "Montserrat-SemiBold",
                      fontWeight: "bold",
                    }}
                  >{`${
                    item.info?.price
                      ? item.info?.price * item.item.quantity
                      : 0.0
                  } ${currencyText(item.info?.currency)}`}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View
              style={{
                backgroundColor: "grey",
              }}
            ></View>
          )}
        </View>
        <View
          style={{
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 5,
            }}
          >
            <Text
              style={{
                width: "50%",
                fontSize: 20,
                fontFamily: "Montserrat-SemiBold",
                fontWeight: "bold",
              }}
            >
              A tener en cuenta sobre el pedido
            </Text>
            <Pressable
              onPress={() => {
                console.log("Add new note ...");
              }}
            >
              <Text
                style={{
                  color: "#BE384C",
                  fontSize: 20,
                  fontFamily: "Montserrat-SemiBold",
                  fontWeight: "bold",
                }}
              >
                + Añadir nota
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              paddingLeft: 20,
              paddingTop: 10,
            }}>
            {order?.notes?.map((item, index) => (
              <View key={`order-note-${index}`}>
                <Text
                  style={{
                    color: "#434445",
                    fontSize: 16,
                    fontFamily: "Montserrat-Regular",
                  }}
                >{`-${item}`}</Text>
              </View>
            ))}
          </View>
          {/* <FlatList
            data={order?.notes}
            keyExtractor={(item, index) => `order-note-${index}`}
            style={{
              paddingLeft: 20,
              paddingTop: 10,
            }}
            renderItem={({ item, index, separators }) => (
              <View>
                <Text
                  style={{
                    color: "#434445",
                    fontSize: 16,
                    fontFamily: "Montserrat-Regular",
                  }}
                >{`-${item}`}</Text>
              </View>
            )}
          /> */}
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#BE384C",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 5,
              height: 90,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "Montserrat-Regular",
              }}
            >
              Comensales
            </Text>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "transparent",
                width: "35%",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setDinners((prev) => {
                    let newVal = prev - 1;
                    if (newVal < 1) {
                      newVal = 1;
                    }
                    return newVal;
                  });
                }}
              >
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 22.5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat-Regular",
                      fontSize: 35,
                      color: "#BE384C",
                    }}
                  >
                    -
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "Montserrat-Regular",
                  fontSize: 20,
                  color: "white",
                }}
              >
                {dinners}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setDinners((prev) => prev + 1);
                }}
              >
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 22.5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat-Regular",
                      fontSize: 35,
                      color: "#BE384C",
                    }}
                  >
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Montserrat-SemiBold",
                color: "#434445",
              }}
            >
              Total
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Montserrat-SemiBold",
                color: "#BE384C",
              }}
            >
              {getTotalCost()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Montserrat-SemiBold",
                color: "#434445",
              }}
            >
              Coste por persona
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Montserrat-SemiBold",
                color: "#BE384C",
              }}
            >
              {getCostPerDinner()}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#BE384C",
              height: 60,
              marginHorizontal: "10%",
              marginTop: 50,
              borderRadius: 22.5,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              navigation.navigate("OrderPaymentScreen", {
                order_id: order_id,
              });
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "Montserrat-SemiBold",
              }}
            >
              Ir al pago
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const OrderPaymentScreen = ({ route, navigation }: OrderScreenProps<'OrderPaymentScreen'>) => {
  // const insets = useSafeAreaInsets();
  const orders = useSelector((state: RootState) => state.kellner.orders);
  const allRecipes: Recipe[] = useSelector((state: RootState) => state.kellner.recipes);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.Apple);
  const { order_id }:{order_id: number|undefined} = route.params;
  const order = orders.find((e) => e.id === order_id);
  console.log('order checkout:', order);

  const recipeItemListFromOrder = (inOrder: Order) => {
    const inOrderRecipes: OrderRecipeItem[]|undefined =  inOrder?.recipes.map(
      (r) => {
        const recipeInfo = allRecipes.find(e => e.id === r.recipe_id)
        const orderRecipe: OrderRecipeItem = {
          item: r,
          info: recipeInfo,
        };
        return orderRecipe;
      }
    );

    return inOrderRecipes ? inOrderRecipes : [];
  };

  const getTotalCost = () => {
    if (!order) {
      return '';
    }
    const list = recipeItemListFromOrder(order);
    if (list.length <= 0) {
      return '';
    }

    let total = 0.0;
    let currency = list[0].info ? list[0].info.currency : Currency.EU;
    const initVal = {
      val: 0.0
    };
    const sumCost = list.reduce((pre, current: OrderRecipeItem) => {
      if (current.info) {
        return {val: (pre.val + current.info?.price * current.item.quantity)};
      }
      else {
        return {val: pre.val};
      }
    }, initVal);
    total = sumCost.val;

    return `${total}${currencyText(currency)}`
  };

  return (
    <View style={[styles.container, { backgroundColor: "#F3F3F3" }]}>
      <ScrollView>
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 10,
            paddingTop: 25,
          }}
        >
          <Text
            style={{
              color: "#6E6E6F",
              fontSize: 15,
              fontFamily: "Montserrat-Regular",
            }}
          >
            Dirección de facturación
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                color: "#434445",
                fontSize: 18,
                fontFamily: "Montserrat-Regular",
                width: "80%",
              }}
            >
              Pintor Picasso 70, 5ºB San Vicente del Raspeig, Alicante 03690
            </Text>
            <Pressable onPress={() => {}}>
              <Text
                style={{
                  color: "#BE384C",
                  fontSize: 18,
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Editar
              </Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginTop: 10,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: 'center',
              height: 50,
            }}
          >
            <Text style={{
              color: "#6E6E6F",
              fontSize: 15,
              fontFamily: "Montserrat-Regular",
            }}>Método de pago</Text>

            <Text style={{
              color: "#BE384C",
              fontSize: 15,
              fontFamily: "Montserrat-Regular",
            }} onPress={() => {
              console.log('To add new payment method ...');
            }}>+ Añadir método de pago</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#F3F3F3",
              alignItems: "center",
              marginVertical: 5,
              borderRadius: 5,
              borderColor: "#E7E7E7",
              borderWidth: 1,
              height: 55,
            }}
          >
            <View style={{ backgroundColor: "transparent", marginLeft: 25 }}>
              <FontAwesome5 name="apple-pay" size={50} color="black" />
            </View>
            <Pressable
              onPress={() => {
                setPaymentMethod(PaymentMethod.Apple);
              }}
              style={{
                marginRight: 25,
              }}
            >
              {paymentMethod === PaymentMethod.Apple ? (
                <FontAwesome name="circle" size={26} color="#BB3A4D" />
              ) : (
                <Entypo name="circle" size={24} color="#BB3A4D" />
              )}
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#F3F3F3",
              alignItems: "center",
              marginVertical: 5,
              borderRadius: 5,
              borderColor: "#E7E7E7",
              borderWidth: 1,
              height: 55,
            }}
          >
            <View style={{
              backgroundColor: "transparent",
              marginLeft: 25,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Fontisto name="visa" size={35} color="blue" />
              <Text style={{
                marginLeft: 5,
                fontFamily: "Montserrat-Regular",
              }}>{`**** **** **** 2178`}</Text>
            </View>
            <Pressable
              onPress={() => {
                setPaymentMethod(PaymentMethod.Visa);
              }}
              style={{
                marginRight: 25,
              }}
            >
              {paymentMethod === PaymentMethod.Visa ? (
                <FontAwesome name="circle" size={26} color="#BB3A4D" />
              ) : (
                <Entypo name="circle" size={24} color="#BB3A4D" />
              )}
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#F3F3F3",
              alignItems: "center",
              marginVertical: 5,
              borderRadius: 5,
              borderColor: "#E7E7E7",
              borderWidth: 1,
              height: 55,
            }}
          >
            <View style={{
              backgroundColor: "transparent",
              marginLeft: 25,
              flexDirection: 'row',
              alignItems: 'center'
              }}>
              <FontAwesome name="paypal" size={35} color="blue" />
              <Text style={{
                marginLeft: 5,
                fontFamily: "Montserrat-Regular",
              }}>{`gm@hydros-pwr.com`}</Text>
            </View>
            <Pressable
              onPress={() => {
                setPaymentMethod(PaymentMethod.Paypal);
              }}
              style={{
                marginRight: 25,
              }}
            >
              {paymentMethod === PaymentMethod.Paypal ? (
                <FontAwesome name="circle" size={26} color="#BB3A4D" />
              ) : (
                <Entypo name="circle" size={24} color="#BB3A4D" />
              )}
            </Pressable>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginTop: 10,
            paddingHorizontal: 10,
            height: '100%',
          }}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
            <Text style={{
              color: "#434445",
              fontSize: 20,
              fontFamily: "Montserrat-Regular",
            }}>Total</Text>
            <Text style={{
              color: "#BE384C",
              fontSize: 20,
              fontFamily: "Montserrat-Regular",
            }}>{getTotalCost()}</Text>
          </View>
          <Pressable onPress={() => {
            console.log('To make the payment ...');
            navigation.navigate("OrderPaymentDoneScreen");
          }}
          style={{
            backgroundColor: '#BE384C',
            alignItems: 'center',
            justifyContent: 'center',
            height: 55,
            marginHorizontal: '5%',
            marginTop: 10,
            borderRadius: 22.5,
          }}>
            <Text style={{
              color: "white",
              fontSize: 20,
              fontFamily: "Montserrat-Regular",
            }}>Pagar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const OrderPaymentDoneScreen = ({ route, navigation }: OrderScreenProps<'OrderPaymentDoneScreen'>) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="repeat"
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: 'transparent',
            marginTop: insets.top
          }}
        >
          <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fpayment-done.png?alt=media&token=7e89aaa1-6830-43a3-8143-8a6619014af6'}}
            style={{
              width: '62%',
              height: '55%',
              paddingTop: 25,
              resizeMode: "stretch"}}></Image>
          <Text style={{
            color: 'white',
            fontFamily: "Montserrat-SemiBold",
            fontSize: 25,
            width: '60%',
            textAlign: 'center',
            marginTop: 20,
          }}>¡Pedido realizado con éxito!</Text>
          <Button
            mode="contained"
            onPress={() => {
              console.log("Resetting password ...");
              // navigation.getParent()?.navigate('');
              navigation.navigate("OrderHomeScreen");
            }}
            color={"white"}
            contentStyle={{ height: 60, width: 350 }}
            labelStyle={{ fontSize: 22, color: "#C93E54" }}
            style={[styles.signInButton, { marginTop: 30 }]}
            uppercase={false}
          >
            Volver
          </Button>
        </View>
      </ImageBackground>
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
        name="OrderPaymentDoneScreen"
        component={OrderPaymentDoneScreen}
        options={{ headerShown: false }}
      />
    </OrderStack.Navigator>
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
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButton: {
    marginTop: 20,
    borderRadius: 50,
  },
});
