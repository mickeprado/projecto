'use strict'

import AWSConstants from './constants';
import AwsLambdaService from './lambda'
import Session from './session'

class AuthenticationClass 
{
      constructor() {
        this.session = Session;
    }
    async signIn(user, password, familycode) {
        var _params = {
            username : user,
            password : password,
            familycode : familycode
        };
        console.log('signIn call');
        console.log(_params);
    
        //DUMY RESPONSE, REMOVE ONCE THE LAMBDA WORKS
        //return {isOk:true, data:this.session, body:{}, isValid : () =>{return true}};
 
        let errorMessage = '';
        let obj = await AwsLambdaService.invokeAsync(AWSConstants._AWS_SIGNIN_ID, _params);
        if(obj.isOk){
           
            let dataReceived = JSON.parse(obj.data.Payload.toString());
          //  Console.log(dataReceived);
            
            if(!dataReceived || dataReceived.errorMessage || dataReceived.code === 'NotAuthorizedException')      
            {
              errorMessage ="Sorry pal, seems that your user name or password are not valid.";
              if(dataReceived != null && dataReceived.message != null)          
                errorMessage = dataReceived.message;
            }
            else {
              //if (dataReceived.errorMessage || dataReceived.code === 'NotAuthorizedException') {                
            //    errorMessage = "No authorization exception";
             // } else {
                this.session.user.username = user;
                this.session.user.password = password;
                this.session.accessToken = dataReceived.accessToken.jwtToken;
                this.session.idToken = dataReceived.idToken.jwtToken;
               this.session.user.alias = dataReceived.accessToken.payload.alias;
                this.session.user.appUserId = dataReceived.accessToken.payload.appuser_id;
                this.session.user.firstName = dataReceived.accessToken.payload.firstname;
               this.session.user.lastName = dataReceived.accessToken.payload.lastname;

                return {isOk:true, data:this.session, body:dataReceived, isValid : () =>{return true}};
        //      }
            }

            return { isOk : false, message:errorMessage, error:obj, body: null , isValid : () =>{return false}};            

        }else{
            console.log('error calling lambda');
            console.log(obj);
            return { isOk : false, message:"error calling lambda", error:obj, body: null, isValid : () =>{return false}};
        }
 
        
    } 

    async signOut(userName){
        var _params = {
            username : username
        };
        let lambdaResponse = await AwsLambdaService.invokeAsync(AWSConstants._AWS_SIGNOUT_ID, _params);
        let result = await lambdaResponse.json();
        if(result.isOk){
            return {isOk : result.isOk, data:result.data, body: result.data };
        }
        return result;
    }

    async currentSession(){
        //not sure what to query here
        
        return {isOk :false, message:"Not implemented", body: null, isValid : () =>{return false} };
    }

}

export default new AuthenticationClass();