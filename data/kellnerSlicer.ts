import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import User from '../model/users';
import Order from '../model/order';
import Restaurant from '../model/restaurant';
import Recipe from '../model/recipe';
import { OrderStatus } from '../model/enums';
import Comment from '../model/comment';
import { Currency } from '../model/enums';
import { PaymentMethod } from '../model/enums';
import { RecipeItem } from '../model/order';

export interface LoginState {
  isLoading: boolean;
  isFirstSignin: boolean;
  user: User|null|undefined;
}

export interface KellnerState {
  loginState: LoginState;

  //Test Only, will be sync to server
  orders: Order[];
  restaurants: Restaurant[];
  recipes: Recipe[];
  users: User[];
  comments: Comment[];

  otherState: number;
}

const initialState: KellnerState = {
  loginState: {
    isLoading: true,
    isFirstSignin: true,
    user: null,
  },
  orders: [],
  restaurants:[
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
    },
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
    },
    {
      id: 6,
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
      id: 7,
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
      id: 8,
      name: 'Fiorentini',
      loc: [97.38, 102.54],
      recips: [0, 1, 2],
      images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-back-3.png?alt=media&token=a1b40d22-6040-42af-b94a-72a8e96619fd'],
      address: '101 Smith Ranch Rd C, San Rafael, CA 94903US',
      stars: 4.9,
      introduction: '',
      comments: [0, 1, 2, 3],
    },
  ],
  recipes: [
    {
      id: 0,
      name: "Hamburguesa pollo",
      images: [
        "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-recipe-1.png?alt=media&token=efece233-2284-4c4e-accd-8eb4b83bfca0",
        "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-recipe-2.png?alt=media&token=e207c83e-f003-40ef-bfa1-f224551ce31e",
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
  ],
  users: [
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
  ],
  comments: [
    {
      id: 0,
      author_id: 1,
      restaurant_id: 0,
      content: `Me gustó la comida del restaurante. Los platos son atractivos y muy bonitos. Buena comida, espacio lujoso y servicio entusiasta. Volveré enel…`,
      create_date: new Date("2022-05-17T03:24:00").toISOString(),
      update_date: new Date("2022-05-17T03:24:00").toISOString(),
      stars: 4.9,
      images: [
        "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fcomment-images-1.png?alt=media&token=8b92f38b-d5df-4597-827c-416ab30833c9",
        "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fcomment-image-2.png?alt=media&token=56d8c97c-016a-47d1-8ca2-95a5c2c09c0c",
        "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fcomment-image-3.png?alt=media&token=e797fe5e-ac8f-4d54-a9ff-41d4779fd512",
      ],
    },
    {
      id: 1,
      author_id: 2,
      restaurant_id: 1,
      content: `Me gustó la comida del restaurante. La reserva y la integración con Kellner fue maravillosa. Hicimos la reserva por la app, nos sentarnos en la mesa y pagamos al instante…`,
      create_date: new Date("2022-05-18T03:24:00").toISOString(),
      update_date: new Date("2022-05-18T03:24:00").toISOString(),
      stars: 4.9,
      images: [
        "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fcomment-image-4.png?alt=media&token=60225c2d-1c41-49a9-a03b-23e4a732fa8e",
        "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fcomment-image-5.png?alt=media&token=eac9c796-0932-4708-a253-d2da5b932f06",
      ],
    },
  ],
  otherState: 0,
};

export const kellnerSlice = createSlice({
  name: 'kellner',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
    flagAppLoading: (state) => {
      state.loginState.isLoading = true;
    },
    flagAppLoaded: (state) => {
      state.loginState.isLoading = false;
    },
    setAuthedUser: (state, action: PayloadAction<User>) => {
      state.loginState.user = action.payload;
    },
    clearAuthedUser: (state) => {
      state.loginState.user = null;
    },
    updateFirstSignin: (state, action: PayloadAction<boolean>) => {
      state.loginState.isFirstSignin = action.payload;
    },
    updateLoginState: (state, action: PayloadAction<LoginState>) => {
      state.loginState = action.payload
    },
    addRecipeToOrder: (state, action: PayloadAction<RecipeItem>) => {
      //Notes:  1, Each order is associated with a single restaurant
      //        2, A new created order may has some time for valid (e.g, 30 mins ), after that it will expire and becomes invalid if
      //           still not being paid, and removed automatically from order list
      //        3, History of order list should be stored in server, and may be viewed if the user want
      const inRecipeItem = action.payload;
      if (!inRecipeItem) {
        return;
      }

      const existOrderIndex = state.orders.findIndex((element) => element.restaurants_id === inRecipeItem.restaurant_id);
      if (existOrderIndex < 0) {
        let newOrder: Order = {
          id: state.orders.length, //TODO: using guid instead
          creator_id: state.loginState.user?.id, //TODO: using real user id
          restaurants_id: inRecipeItem.restaurant_id,
          recipes: [inRecipeItem],
          create_date: new Date().toISOString(),
          update_date: new Date().toISOString(),
          status: OrderStatus.New,
          payment_method: PaymentMethod.Visa,
          notes: [
            //Test only
            "Hamburguesa poca hecha",
            "Rápido que tengo prisa",
          ],
        };
        state.orders.push(newOrder);

        console.log('addRecipeToOrder, add to a new order, now orders are:', state.orders);
        return;
      }

      state.orders[existOrderIndex].recipes.push(inRecipeItem);
      console.log('addRecipeToOrder, add to a existing order, now orders are:', state.orders);
    },
    removeRecipeFromOrder: (state, action: PayloadAction<RecipeItem>) => {
      //Notes:  1, Each order is associated with a single restaurant
      //        2, A new created order may has some time for valid (e.g, 30 mins ), after that it will expire and becomes invalid if
      //           still not being paid, and removed automatically from order list
      //        3, History of order list should be stored in server, and may be viewed if the user want
      const inRecipeItem = action.payload;
      if (!inRecipeItem) {
        return;
      }

      const existOrderIndex = state.orders.findIndex((element) => element.restaurants_id === inRecipeItem.restaurant_id);
      if (existOrderIndex < 0) {
        return;
      }
      state.orders[existOrderIndex].recipes = state.orders[existOrderIndex].recipes.filter(item => item.recipe_id !== inRecipeItem.recipe_id);
    },
    updateRecipeInOrder: (state, action: PayloadAction<RecipeItem>) => {
      //Notes:  1, Each order is associated with a single restaurant
      //        2, A new created order may has some time for valid (e.g, 30 mins ), after that it will expire and becomes invalid if
      //           still not being paid, and removed automatically from order list
      //        3, History of order list should be stored in server, and may be viewed if the user want
      const inRecipeItem = action.payload;
      if (!inRecipeItem) {
        return;
      }

      const existOrderIndex = state.orders.findIndex((element) => element.restaurants_id === inRecipeItem.restaurant_id);
      if (existOrderIndex < 0) {
        return;
      }

      const existRecipeIndex = state.orders[existOrderIndex].recipes.findIndex((element) => element.recipe_id === inRecipeItem.recipe_id);
      if (existRecipeIndex < 0) {
        // New recipe
        state.orders[existOrderIndex].recipes.push(inRecipeItem);
      }
      else {
        state.orders[existOrderIndex].recipes[existRecipeIndex] = inRecipeItem;
      }
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter(data => data.id !== action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  flagAppLoading, flagAppLoaded, setAuthedUser,
  clearAuthedUser, updateLoginState, updateFirstSignin,
  addRecipeToOrder, removeRecipeFromOrder, updateRecipeInOrder, removeOrder, clearOrders
} = kellnerSlice.actions

export default kellnerSlice.reducer