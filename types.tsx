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
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

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