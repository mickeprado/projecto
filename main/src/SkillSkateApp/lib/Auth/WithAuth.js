import React from 'react';
import { Font } from 'expo';
import { Header } from 'react-native-elements';

import LocalStorage from '../LocalStorage';
import Services from '../Aws';

import{ styles, colors} from '../../src/Components/MainStyles';


/**
 * @param {React.Component} WrappedComponent 
 * @returns {React.Component}
 */
function WithAuth(WrappedComponent) {
  return class extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        ready: false,
        session: null,
      };

      this.handleOnSignIn = this.handleOnSignIn.bind(this);
      this.handleOnSignOut = this.handleOnSignOut.bind(this);
      console.log("WhitAuth constructor");
      console.log(Services);
    }

    async componentDidMount() {
      let session;
      try {
        //await LocalStorage.init();
        await Font.loadAsync({
           'FontAwesome' : require('../../node_modules/@expo/vector-icons/fonts/FontAwesome.ttf'),
           'MaterialIcons' : require('../../node_modules/@expo/vector-icons/fonts/FontAwesome.ttf'),
           'Cabin' : require('../../assets/fonts/Cabin/Cabin-Regular.ttf'),
           'Fira' : require('../../assets/fonts/Fira_Sans/FiraSans-Regular.ttf'),
           'LibreFranklin' : require('../../assets/fonts/Libre_Franklin/LibreFranklin-Regular.ttf'),
           'Rubik' : require('../../assets/fonts/Rubik/Rubik-Regular.ttf'),
           'SourceSans' : require('../../assets/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf')
         });
        session = await Services.Authentication.currentSession();
        
      } catch (err) {
        console.log(err);
        session = null;
      }
      this.setState({
        session,
        ready: true
      });
    }

    handleOnSignIn(session) {
      this.setState({ session });
    }

    handleOnSignUp() { }

    async handleOnSignOut() {
      await Services.Authentication.signOut();
      this.setState({ session: null });
    }

    render() {
      const { ready, session } = this.state;
      console.log('Rendering HOC', ready, !!session);
      const {
        onSignIn,
        doSignOut,
        ...otherProps
      } = this.props;

      return (
        ready && (
          <WrappedComponent
            session={session}
            onSignIn={onSignIn || this.handleOnSignIn}            
            doSignOut={doSignOut || this.handleOnSignOut}
            appContext={Services}
            {...otherProps}
          />
        )
      );
    }
  }
}

export default WithAuth;
