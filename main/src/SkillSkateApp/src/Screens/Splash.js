import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Constants from '../Utils/constants';
import RuteNames from '../Utils/routes';
import { styles } from '../Components/MainStyles'


class Splash extends React.Component {
  static navigationOptions = {
    drawerLockMode: 'locked-closed'
  }

  constructor(props) {
    super(props);
    console.log("Splash screen constructor");
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { session } = this.props;
    console.log('splash didmount');
    try {
      // await new Promise(async (resolve, reject) => setTimeout(() => {
      //   if (!session) {
      //     reject('No current session');
      //     return;
      //   }

      //   resolve();
      // }, 3000));
    } catch (exception) {
      console.log('rejected', exception);
    }
    console.log(session);
    const loggedIn = false; // session && session.isValid();

    this.setState({ isLoading: false });
    console.log('splash.is logged in');
    console.log(loggedIn);
    this._navigateTo(loggedIn ? RuteNames.HOME : RuteNames.FIRST_SCREEN);

  }

  _navigateTo(routeName) {
    this.props.navigation.navigate(routeName);
  }

  render() {
    return (
      this.state.isLoading && <View style={styles.splash}><Text>Loading {Constants._APP_NAME}...</Text></View>
    );
  }

}

export default Splash;
