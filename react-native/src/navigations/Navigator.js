import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Login from "../screens/Login";
import Register from "../screens/registerComponent/Register";
import home from "../screens/homeComponent/home";
import profile from "../screens/profileComponent/profile";
import detail from "../screens/detailPageComponent/detail";
import list from "../screens/propertyListingComponent/list";
import Dashboard from "../screens/dashboardComponent/dashboard";
import AssetImage from "../screens/registerComponent/AssetImage";
import AuthLoading from "../screens/AuthLoading";
import Apipath from "../screens/Apipath";
const stackNavigatorOptions = {
  headerShown: false,
  headerStatusBarHeight: 0,
};
const AppStack = createStackNavigator(
  {
    Dashboard: { screen: Dashboard },
    Home: { screen: home },
    Profile: { screen: profile },
    Detail: { screen: detail },
    PropertyListing: { screen: list },
    AssetImage: { screen: AssetImage },
  },

  {
    defaultNavigationOptions: stackNavigatorOptions,
  }
);
const AuthStack = createStackNavigator(
  {
    ApiPath: { screen: Apipath },
    Login: { screen: Login },
    Register: { screen: Register },
  },

  {
    defaultNavigationOptions: stackNavigatorOptions,
  }
);
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "AuthLoading",
    }
  )
);
