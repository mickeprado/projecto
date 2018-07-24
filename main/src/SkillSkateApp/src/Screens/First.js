import React from 'react';
import RuteNames from '../Utils/routes';
import { Text, View, Platform } from 'react-native';

import { Icon } from 'react-native-elements';
import SignIn from '../Components/LogIn';
import { createBottomTabNavigator } from 'react-navigation';
import { styles, colors } from '../Components/MainStyles';

// export default (props) => {
//   //const { screenProps, ...otherProps } = props;
//   const { screenProps, navigation, ...otherProps } = props;
//   return (
//   <SignIn
//           { ...screenProps }
//           { ...otherProps }
//           onLogIn={() => screenProps.rootNavigator.navigate(RuteNames.HOME)}
//         />);
// };


const FirstScreen = createBottomTabNavigator({
  LogIn: {
    screen: (props) => {
      const { screenProps, navigation, ...otherProps } = props;

      return (
        <SignIn
          { ...screenProps }
          { ...otherProps }
          onLogIn={() => screenProps.rootNavigator.navigate('Home')}
        />
      );
      
    },
    
  },

},
);
  
  
  /*export default(props) => {
   
    
       const { screenProps, navigation, ...otherProps } = props;
  
        return (
          <SignIn
          
            { ...screenProps }
            { ...otherProps }
            onLogIn={() => screenProps.rootNavigator.navigate('home')}
          />
        );
      }*/



 export default (props) => {
   const { screenProps, ...otherProps } = props;
   return <FirstScreen screenProps={{ ...screenProps, ...otherProps }} />
 };
