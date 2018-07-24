import React, {Component} from 'react';
import {StyleSheet,
        View,
        TextInput,
        TouchableOpacity,
        Text,
        StatusBar, 
        Switch,
        TextValidator } from 'react-native';
import { styles, colors } from '../MainStyles';
import Login from '../LogIn';

export default class LoginForm extends Component{
        constructor(props){
        super(props)
       this. state = {
            username: '',
            password: '',
            familycode:'',
            hasfamilycode: false
        };


        
        
        
        }

        _handleToggleSwitch = () =>
        this.setState(state => ({
         hasfamilycode: !state.hasfamilycode,
    
        }));
    
   
   
    render(){
       
    
        return(
            <View style={styles.LoginF}>
            <StatusBar
            barStyle="light-content"
            />
            <TextInput
            onChangeText={this.props.onupdateuser}
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.8)"
            returnKeyType='next'
            onSubmitEditing={()=> this.passwordInput.focus()}
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            autoCapitalize="none"
            autoCorrect={false}
             style={styles.input}
             />
             <TextInput
             placeholder="Password"
             onChangeText={this.props.onupdatepass}
             placeholderTextColor="rgba(255, 255, 255, 0.8)"
             underlineColorAndroid='transparent'
             secureTextEntry
             returnKeyType='go'

             ref={(input)=>this.passwordInput = input}
             style={styles.input}
             />
              {<View style={styles.SwichConatainer}>

                  <Text  style={styles.text} >I'm a family group member</Text>
                  <Switch  style={styles.swich} onValueChange={this._handleToggleSwitch} onPress={this.props._familyCodePadernatern} value={this.state.hasfamilycode} />
                  </View>}
                  {this.state.hasfamilycode ?
            <TextInput
             placeholder="FamilyCode"
             placeholderTextColor="rgba(255, 255, 255, 0.8)"
             value={this.state.familycode}
             underlineColorAndroid='transparent'
             style={styles.input}
              />:null
          }
             <TouchableOpacity style={styles.buttonContainer} onPress={this.props.onpres}>
                    
                 <Text style={styles.buttonText}>LOGIN</Text>
                 
             </TouchableOpacity>
            </View>
        )
    }
}
