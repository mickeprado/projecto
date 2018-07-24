import React from 'react';
import { Text } from 'react-native';
import RouteNames from '../Utils/routes';

export default class SignOut extends React.Component {
  componentDidMount() {
    const { appContext } = this.props.screenProps;
    appContext.Authentication.signOut();

    this.props.rootNavigator.navigate(RouteNames.FIRST_SCREEN);
  }

  render() {
    return <Text>Sign Out</Text>;
  }
}
