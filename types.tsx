/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};
export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;
export type RootTabParamList = {
  Start: undefined;
  Reserve: undefined;
  Order: undefined;
  Favorite: undefined;
  Profile: undefined;
};
// We do not have nested navagator in this tab, so do not need use composite screen props
// export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
//   BottomTabScreenProps<RootTabParamList, Screen>,
//   NativeStackScreenProps<RootStackParamList>
// >;
export type RootTabStartScreenProps = BottomTabScreenProps<RootTabParamList, 'Start'>;
export type RootTabReserveScreenProps = BottomTabScreenProps<RootTabParamList, 'Reserve'>;
export type RootTabOrderScreenProps = BottomTabScreenProps<RootTabParamList, 'Order'>;
export type RootTabFavoriteScreenProps = BottomTabScreenProps<RootTabParamList, 'Favorite'>;
export type RootTabProfileScreenProps = BottomTabScreenProps<RootTabParamList, 'Profile'>;

export type UserAuthParamList = {
  Home: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  ForgetPasswordScreen: undefined;
  InputVerifyCodeScreen: undefined;
  ResetPasswordScreen: undefined;
};
export type UserAuthScreenProps<Screen extends keyof UserAuthParamList> = CompositeScreenProps<
  BottomTabScreenProps<UserAuthParamList, Screen>,
  NativeStackScreenProps<UserAuthParamList>
>;
export type HomeScreenProps = NativeStackScreenProps<UserAuthParamList, 'Home'>;
export type SinInScreenProps = NativeStackScreenProps<UserAuthParamList, 'SignInScreen'>;
export type SinUpScreenProps = NativeStackScreenProps<UserAuthParamList, 'SignUpScreen'>;
export type ForgetPasswordScreenProps = NativeStackScreenProps<UserAuthParamList, 'ForgetPasswordScreen'>;
export type InputVerifyCodeScreenProps = NativeStackScreenProps<UserAuthParamList, 'InputVerifyCodeScreen'>;
export type ResetPasswordScreenProps = NativeStackScreenProps<UserAuthParamList, 'ResetPasswordScreen'>;

export type StartStackParamList = {
  StartHomeScreen: undefined;
  StartRecipeScreen: {
    restaurant_id: number | undefined,
    restaurant_name: string | undefined,
    restaurant_logo: string | undefined,
    restaurant_stars: number | undefined,
    restaurant_comments_len: number | undefined,
  };
  StartCommentScreen: { 
    restaurant_id: number | undefined,
    restaurant_name: string | undefined,
    restaurant_logo: string | undefined,
    restaurant_stars: number | undefined,
   };
};
// export type StartHomeScreenProps = NativeStackScreenProps<StartStackParamList, 'StartHomeScreen'>;
// export type StartRecipeScreenProps = NativeStackScreenProps<StartStackParamList, 'StartRecipeScreen'>;
// export type StartCommentScreenProps = NativeStackScreenProps<StartStackParamList, 'StartCommentScreen'>;

export type StartScreenProps<Screen extends keyof StartStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<StartStackParamList, Screen>,
  BottomTabScreenProps<RootTabParamList>
>;

export type OrderStackParamList = {
  OrderHomeScreen: undefined;
  OrderCheckoutScreen: {
    order_id: number | undefined,
  };
  OrderPaymentScreen: {
    order_id: number | undefined,
   };
};
export type OrderScreenProps<Screen extends keyof OrderStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<OrderStackParamList, Screen>,
  BottomTabScreenProps<RootTabParamList>
>;