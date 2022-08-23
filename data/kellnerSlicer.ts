import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import User from '../model/users';
import Order from '../model/order';
import { OrderStatus } from '../model/enums';
import { PaymentMethod } from '../model/enums';
import { RecipeItem } from '../model/order';

export interface LoginState {
  isLoading: boolean;
  isFirstSignin: boolean;
  user: User|null|undefined;
}

export interface KellnerState {
  loginState: LoginState;
  orders: Order[];
  otherState: number;
}

const initialState: KellnerState = {
  loginState: {
    isLoading: true,
    isFirstSignin: true,
    user: null,
  },
  orders: [],
  otherState: 0
}

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
          payment_method: PaymentMethod.Visa
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