import React from 'react';
import {
  TouchableOpacity,
  TextValidator,
  StatusBar,
  TextInput,
  StyleSheet,
  View,  
  Switch,
  Image,
  ActivityIndicator,  
  Modal,
  Text,
  KeyboardAvoidingView
} from 'react-native';
import {
  FormInput,  
  FormValidationMessage,
  Button
} from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';

import { styles, colors } from './MainStyles';
import Constants from '../Utils/constants';
import LoginForm from './pages/LoginForm';

class LogIn extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      showActivityIndicator: false,
      username: '',
      password: '',
      familycode:'',
      hasfamilycode: false,
      errorMessage: '',
      appUser: ''
    };

    this.baseState = this.state;

    this.handleLogInClick = this.handleLogInClick.bind(this);
    this.familyCodeSelection = this.familyCodeSelection.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.onLogIn = this.onLogIn.bind(this);
    console.log('LogIn constructor');
  }

  async onLogIn() {
    this.setState(this.baseState);

    this.props.onLogIn();
  }

  async doLogin() {
    const { appContext } = this.props;
    const { username, password, hasfamilycode, familycode } = this.state;
    let errorMessage = '';    
    let session = null;

    try {
      let response = await appContext.Authentication.signIn(username, password, hasfamilycode, familycode);
      console.log('response user:', response);
      if(response.isOk){
         session = response.data;
      }else{
        errorMessage = response.message;
      }
        
    } catch (exception) {
      console.log(exception);
      errorMessage = exception.invalidCredentialsMessage || exception.message || exception;
    }

    this.setState({
      errorMessage,
      session,
      showActivityIndicator: false,
    }, () => {
      if (session) {
        this.props.onLogIn();
      }
    });
  }

  handleLogInClick() {
    this.setState({ showActivityIndicator: true });
   
    


    setTimeout(this.doLogin, 0);
  }

  familyCodeSelection(){
    let newstatus = !this.state.hasfamilycode;
    this.setState({ hasfamilycode: newstatus});
  }
  _handleToggleSwitch = () =>
    this.setState(state => ({
        hasfamilycode: !state.hasfamilycode,

    }));
    onUpdateuser = (use) => {
      console.log(use);
      this.setState({username: use,})
    };
    onUpdatepass = (pass) => {
      console.log(pass);
      this.setState({password: pass,})
    };
  
  render() {
    return (      
      <KeyboardAvoidingView behavior="padding" style={styles.colorfondo}>
       <View style={styles.LogoContainer}>
      <Image 
      resizeMode='contain'
      source={require('../../assets/images/SkillSkateLogo.png')}
       style={styles.logo}
       
       />
      </View>
      <View style={styles.formContainer}>
      <LoginForm _familyCodePadernatern={this._handleToggleSwitch} onupdateuser={this.onUpdateuser} onupdatepass={this.onUpdatepass} onpres={this.handleLogInClick}/>
      </View>
      </KeyboardAvoidingView>
        
    
    /*  <View style={styles.bla}>        
        <Modal
          visible={this.state.showActivityIndicator}
          onRequestClose={() => null}
        >
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
          />
        </Modal>
        <View style={styles.imageContainer}>
          <Image
            resizeMode='contain'
            source={require('../../assets/images/logos_SS.png')}
            style={styles.logoimg}
          />
        </View>
        <View style={styles.formContainer}>
          <FormValidationMessage labelStyle={styles.validationText}>{this.state.errorMessage}</FormValidationMessage>
          <FormInput
            inputStyle={styles.input}
            selectionColor={colors.primary}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            editable={true}
            placeholder="Please enter your username"
            returnKeyType="next"
            ref="username"
            textInputRef="usernameInput"


            onSubmitEditing={() => { this.refs.password.refs.passwordInput.focus() }}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username} />


          <FormInput
            inputStyle={styles.input}
            selectionColor={colors.primary}
            underlineColorAndroid="transparent"
            editable={true}
            secureTextEntry={true}
            placeholder="Please enter your password"
            returnKeyType="next"
            ref="password"
            textInputRef="passwordInput"


            onChangeText={(password) => this.setState({ password })}
            value={this.state.password} />


{/*           <CheckboxFormX 
            style={styles.checkbox}
            label="Have a family code"
            value={this.state.hasfamilycode}
            onChecked = {this.familyCodeSelection}
             /> }
              {this.state.hasfamilycode ?              
          <FormInput
            inputStyle={styles.input}
            selectionColor={colors.primary}
            underlineColorAndroid="transparent"
            editable={true}
            secureTextEntry={true}
            placeholder="Please enter your family code"
            returnKeyType="next"
            ref="familycode"
            textInputRef="familycodeInput"


            onChangeText={(familycode) => this.setState({ familycode })}
            value={this.state.familycode} /> : null}


          <Button
            buttonStyle={styles.button}
            titleStyle ={styles.buttonText}
            containerViewStyle={{ marginTop: 20 }}
            large
            title="SIGN IN"
            onPress={this.handleLogInClick} />
          {/* <Text
            onPress={() => this.props.navigation.navigate('ForgotPassword')}
            style={styles.passwordResetButton}
          >Forgot your password?</Text> }
        </View>
      </View>*/
    );
  }

}

const LogInStack = (createStackNavigator({
  
  LogIn: {
    
    screen: (props) => {
      const { screenProps, ...otherProps } = props;

      return <LogIn {...screenProps} {...otherProps} />;
    },
    
    navigationOptions: {
      title: Constants.APP_NAME,
      header: null,
    },
  },
}, { mode: 'modal' }));

export default props => <LogInStack screenProps={{ ...props }} />;
//export default props => { const { screenProps, ...otherProps } = props; return <LogIn {...screenProps} {...otherProps} />; };
