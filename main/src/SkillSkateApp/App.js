global.Buffer = global.Buffer || require('buffer').Buffer; // Required for aws sigv4 signing

import React from 'react';
import { createDrawerNavigator } from 'react-navigation';


import RouteNames from './src/Utils/routes';
import { WithAuth } from './lib/Auth';


import First from './src/Screens/First';
import Splash from './src/Screens/Splash';
import Home from './src/Screens/Home';
import SignOut from './src/Components/SignOut';
// import ForgotPassword from './src/Components/ForgotPassword';



const App = createDrawerNavigator({
  Home: {
    screen: props => <Home rootNavigator={props.navigation} {...props.screenProps } />,
  },
  Splash: {
    screen: props => <Splash navigation={props.navigation} { ...props.screenProps } />,
    navigationOptions: {
      drawerLabel: ' ',
    },
  },
  FirstScreen: {
   
    screen: props => <First rootNavigator={props.navigation} screenProps={{ ...props.screenProps }} />,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
     
      
      header: null,
      
      
    },
  },
}, { initialRouteName: RouteNames.SPLASH });

const AppContainer = props => <App screenProps={{ ...props }} />;

export default WithAuth(AppContainer);
