import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import * as AWS from 'aws-sdk';
// import * as AWSCognito from 'aws-sdk';

import { AWSConstants, SessionConstants, AppConstants } from './../misc/app.systen.constants';
import { RoutingConstants } from './../misc/app.routes.constants';

import { UserSigninModel } from './../modules/signin/models/signin.model';
import { SignUpModel } from './../modules/signup/models/signup.model';
import { FamilyGroupModel } from './../modules/familygroup/models/familyGroup.model';
import { AppUserModel } from './../modules/signup/models/appUser.model';

// declare let AWS: any;
// declare let AWSCognito: any;
declare let apigClientFactory: any;

export interface Callback {
  cognitoCallback(message: string, result: any): void;
  cognitoCallbackWithCreds(
    message: string,
    result: any,
    creds: any,
    data: any
  ): void;
}

@Injectable()
export class AwsService {
  token: any;
  userData: any;

  /************ RESOURCE IDENTIFIERS *************/
  poolData = {
    UserPoolId: AWSConstants._AWS_USERPOOL_ID, // CognitoUserPool
    ClientId: AWSConstants._AWS_CLIENT_ID, // CognitoUserPoolClient
    Paranoia: 7
  };
  identityPool: string = AWSConstants._AWS_FED_POOL_ID; // CognitoIdentityPool
  region: string = AWSConstants._AWS_REGION; // Region Matching CognitoUserPool region

  /*********************************************/

  constructor(private _http: Http) {
    AWS.config.update({
      region: this.region,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: AWSConstants._AWS_IDENTITY_POOL_ID
      })
    });

    // Aparently this code is needed only in the scenario where the pool requires authentication
    // AWSCognito.config.region = this.region;
    // AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
    //      IdentityPoolId: AWSConstants._AWS_IDENTITY_POOL_ID
    // });
  }

  signInUser(user: string, password: string, familyCode : string, handleSignInCallback) {
    // let pullReturned = null;
    // let slotResults;
    // let isSpinning = false;

    // Prepare to call Lambda function
    const lambda = new AWS.Lambda({
      region: AWSConstants._AWS_REGION,
      apiVersion: AWSConstants._AWS_API_VERSION
    });
    const pullParams = {
      FunctionName: AWSConstants._AWS_SIGNIN_ID,
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify({ username: user, password: password, familyCode : familyCode })
    };

    const signInModel = new UserSigninModel();
    let invokeSuccess = true;
    let errorMessage = "";
    const res = lambda.invoke(pullParams, async (err, data) => {
      let dataReceived = JSON.parse(data.Payload.toString());
      console.log("dataReceived _AWS_SIGNIN_ID");
      console.log(dataReceived);

      console.log("err _AWS_SIGNIN_ID");
      console.log(err);
      if (err) {
        // TODO: Add error handling
        alert(err);
        invokeSuccess = false;
        errorMessage = err.toString();

      } 
      else if(dataReceived == null)      
      {
        invokeSuccess = false;
        errorMessage ="Error found on sign in";
        if(dataReceived != null && dataReceived.message != null)          
          errorMessage = dataReceived.message;
      }
      else {
        if (dataReceived.errorMessage || dataReceived.code === 'NotAuthorizedException') {
          invokeSuccess = false;
          errorMessage = dataReceived.errorMessage;
        } else {
          signInModel.username = user;
          signInModel.password = password;
          signInModel.accessToken = dataReceived.accessToken.jwtToken;
          signInModel.idToken = dataReceived.idToken.jwtToken;
          signInModel.alias = dataReceived.accessToken.payload.alias;
          signInModel.appUserId = dataReceived.accessToken.payload.appuser_id;
          signInModel.firstName = dataReceived.accessToken.payload.firstName;
          signInModel.lastName = dataReceived.accessToken.payload.lastName;
          signInModel.isCoach = dataReceived.accessToken.payload.roles.isCoach;
          signInModel.isParent = dataReceived.accessToken.payload.roles.isParent;
          signInModel.isPlayer = dataReceived.accessToken.payload.roles.isPlayer;
          signInModel.familyGroupCode = dataReceived.accessToken.payload.familyCode;
          signInModel.familyGroupId = dataReceived.accessToken.payload.familyGroupId;
          signInModel.picture = dataReceived.accessToken.payload.picture;          
          signInModel.isOwner = (dataReceived.idToken.payload.custom == AppConstants._APP_USR_TYPE_OWNER);
          
        }
      }

      handleSignInCallback(invokeSuccess ? signInModel : null, errorMessage);
    });
  }

  signUpUser(userName: string, userPassword: string, handleSignUpCallback) {
    // Prepare to call Lambda function
    const lambda = new AWS.Lambda({
      region: AWSConstants._AWS_REGION,
      apiVersion: AWSConstants._AWS_API_VERSION
    });

    const pullParams = {
      FunctionName: AWSConstants._AWS_SIGNUP_ID,
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify({ username: userName, email: userName, password: userPassword })
    };

    const signUpModel = new SignUpModel();
    let invokeSuccess = true;
    const res = lambda.invoke(pullParams, async (err, data) => {
      
      let dataReceived = JSON.parse(data.Payload.toString());
      let errorMessage = "";


      
      if (err) {
        // TODO: Add error handling
        alert(err);
        invokeSuccess = false;
      } 
      else if(dataReceived.code != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.message;
      }
      else {
        
        if (JSON.parse(data.Payload.toString()).errorMessage || JSON.parse(data.Payload.toString()).code === 'NotAuthorizedException') {
          invokeSuccess = false;
        } else {
          signUpModel.userName = userName;
          signUpModel.password = userPassword;
          signUpModel.userEmail = userName; // ToDo: Verify this
        }
        
      }
      console.log("invokeSuccess result of signup");
      console.log(invokeSuccess);
      handleSignUpCallback(invokeSuccess ? signUpModel : null, errorMessage);
    });
  }

  validateCode(userName: string, emailCode: string, validateCodeCallback) {
    // Prepare to call Lambda function
    const lambda = new AWS.Lambda({
      region: AWSConstants._AWS_REGION,
      apiVersion: AWSConstants._AWS_API_VERSION
    });

    const pullParams = {
      FunctionName: AWSConstants._AWS_VALIDATE_CODE_ID,
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify({ username: userName, code: emailCode })
    };

    const signUpModel = new SignUpModel();
    let invokeSuccess = true;
    const res = lambda.invoke(pullParams, async (err, data) => {

      let dataReceived = JSON.parse(data.Payload.toString());
      let errorMessage = "";


      
      if (err) {
        // TODO: Add error handling
        alert(err);
        invokeSuccess = false;
      } 
      else if(dataReceived.code != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.message;
      }
      else {
        if (JSON.parse(data.Payload.toString()).errorMessage || JSON.parse(data.Payload.toString()).code === 'NotAuthorizedException') {
          invokeSuccess = false;
        } else {

        }
      }

      validateCodeCallback(invokeSuccess ? signUpModel : null, errorMessage);
    });
  }

  resendCode(userName: string, resendCodeCallback) {
    // Prepare to call Lambda function
    const lambda = new AWS.Lambda({
      region: AWSConstants._AWS_REGION,
      apiVersion: AWSConstants._AWS_API_VERSION
    });

    const pullParams = {
      FunctionName: AWSConstants._AWS_RESEND_VALIDATE_CODE,
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify({ username: userName })
    };

    
    let invokeSuccess = true;
    const res = lambda.invoke(pullParams, async (err, data) => {

      let dataReceived = JSON.parse(data.Payload.toString());
      let errorMessage = "";
      console.log("dataReceived resendCode");
      console.log(dataReceived);

      
      if (err) {
        // TODO: Add error handling
        alert(err);
        invokeSuccess = false;
      }       
      else if(dataReceived != undefined && dataReceived != null && dataReceived.code != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.message;
        console.log("dataReceived != undefined && dataReceived != null && dataReceived.code != undefined");
      }
      else if(dataReceived == undefined || dataReceived == null)      
      {
        //invokeSuccess = false;
        //errorMessage = "General error on resend code";
      }

      resendCodeCallback(errorMessage);
    });
  }

  // SKILL LEVEL LIST
  getSkillLevelList(callbackFunction) {
    // Prepare to call Lambda function
    const lambda = new AWS.Lambda({
      region: AWSConstants._AWS_REGION,
      apiVersion: AWSConstants._AWS_API_VERSION
    });

    const pullParams = {
      FunctionName: AWSConstants._AWS_DBMNG_SKILLLEVEL,
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify({ dbOperation: 'getList' })
    };

    
    let invokeSuccess = true;
    const res = lambda.invoke(pullParams, async (err, data) => {

      let dataReceived = JSON.parse(data.Payload.toString());
      console.log("dataReceived getSkillLevelList");
      console.log(dataReceived);
      let errorMessage = "";
      let arrayResult = [];
      if (err) {                
        invokeSuccess = false;
        errorMessage = err.toString();
      } 
      else if(dataReceived.code != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.message;
      }
      else {
        if (JSON.parse(data.Payload.toString()).errorMessage || JSON.parse(data.Payload.toString()).code === 'NotAuthorizedException') {
          invokeSuccess = false;
        } else {
            arrayResult = dataReceived;
        }
      }

      callbackFunction(invokeSuccess ? arrayResult : null, errorMessage);
    });
  }

  signUpAppUser(cognitoId: string, firstName: string, lastName: string, alias : string, birthDate : Date, email: string, skillLevelId: number, isCoach: boolean, isParent : boolean, isPlayer : boolean, handlecallback) {
    // Prepare to call Lambda function
    const lambda = new AWS.Lambda({
      region: AWSConstants._AWS_REGION,
      apiVersion: AWSConstants._AWS_API_VERSION
    });

    const pullParams = {
      FunctionName: AWSConstants._AWS_SIGNUP_PROFILE,
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify({         
        dbObject : { 
          cognitoId : cognitoId,  
          firstName : firstName, 
          lastName : lastName, 
          birthDate : birthDate, 
          picture : cognitoId + ".png",
          alias : alias,
          skillLevelId : skillLevelId,
          email : email,
          statusId : 1,
          roles : {
            isCoach : isCoach,
            isParent : isParent,
            isPlayer : isParent
          }
        } 
      })
    };

    let appUser = new AppUserModel();
    let invokeSuccess = true;
    const res = lambda.invoke(pullParams, async (err, data) => {
      
      let dataReceived = JSON.parse(data.Payload.toString());
      let errorMessage = "";
      console.log("dataReceived");
      console.log(dataReceived);
      
      if (err) {
        // TODO: Add error handling        
        invokeSuccess = false;
        errorMessage = dataReceived.errorMessage;
      } 
      else if (dataReceived == null) {
        invokeSuccess = false;
        errorMessage = "General error found on signup"; 
      } 
      else if(dataReceived != null && dataReceived.code != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.message;        
      }
      else if(dataReceived != null && dataReceived.original != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.original.sqlMessage;        
      }
      else if(dataReceived != null && dataReceived.errorMessage != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.errorMessage;        
      }
      else if(dataReceived != null){        
          appUser.appUserId = dataReceived.AppUserId;                  
      }

      handlecallback(invokeSuccess ? appUser : null, errorMessage);
    });
  }

  signUpFamilyMember(userName: string, password: string, familyGroup: string, familyGroupId : number, firstName: string, lastName: string, alias : string, birthDate : Date, email: string, skillLevelId: number, isCoach: boolean, isParent : boolean, isPlayer : boolean, handlecallback) {
    // Prepare to call Lambda function
    const lambda = new AWS.Lambda({
      region: AWSConstants._AWS_REGION,
      apiVersion: AWSConstants._AWS_API_VERSION
    });

    const pullParams = {
      FunctionName: AWSConstants._AWS_SIGNUP_FAMILYMEMBER,
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify({                  
          username : userName,
          password: password,
          familyCode  : familyGroup, 
          familyGroupId : familyGroupId, 
          firstName : firstName, 
          lastName : lastName, 
          birthDate : birthDate, 
          picture : familyGroup + "_" + userName + ".png",
          alias : alias,
          skillLevelId : skillLevelId,
          email : email,
          statusId : 1,
          roles : {
            isCoach : isCoach,
            isParent : isParent,
            isPlayer : isPlayer
          }        
      })
    };

    console.log("signup family member pullParams");
    console.log(pullParams);
    let appUser = new AppUserModel();
    let invokeSuccess = true;
    const res = lambda.invoke(pullParams, async (err, data) => {
      
      let dataReceived = JSON.parse(data.Payload.toString());
      let errorMessage = "";
      console.log("dataReceived");
      console.log(dataReceived);
      
      if (err) {
        // TODO: Add error handling        
        invokeSuccess = false;
        errorMessage = dataReceived.errorMessage;
      } 
      else if (dataReceived == null) {
        invokeSuccess = false;
        errorMessage = "General error found on signup family member"; 
      } 
      else if(dataReceived != null && dataReceived.original != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.original.sqlMessage;        
      }
      else if(dataReceived != null && dataReceived.errorMessage != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.errorMessage;        
      }
      else if(dataReceived != null && dataReceived.code != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.message;        
      }      
      else if(dataReceived != null){        
        appUser.appUserId = dataReceived.AppUserId;                 
      }

      handlecallback(invokeSuccess ? appUser : null, errorMessage);
    });
  }

  // GET USER PROFILE
  getUserProfile(userId: number, callbackFunction) {
    // Prepare to call Lambda function
    const lambda = new AWS.Lambda({
      region: AWSConstants._AWS_REGION,
      apiVersion: AWSConstants._AWS_API_VERSION
    });

    const pullParams = {
      FunctionName: AWSConstants._AWS_DBMNG_APPUSER,
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify({ dbOperation: AWSConstants._AWS_APPUSER_GETBYID, dbObject : {appUserId : userId } })
    };

    console.log("pullParams getUserProfile");
    console.log(pullParams);
    
    let invokeSuccess = true;
    const res = lambda.invoke(pullParams, async (err, data) => {

      let dataReceived = JSON.parse(data.Payload.toString());
      console.log("dataReceived getUserProfile");
      console.log(dataReceived);
      let errorMessage = "";
      let userProfile;
      if (err) {                
        invokeSuccess = false;
        errorMessage = err.toString();
      } 
      else if(dataReceived.code != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.message;
      }
      else {
        if (JSON.parse(data.Payload.toString()).errorMessage || JSON.parse(data.Payload.toString()).code === 'NotAuthorizedException') {
          invokeSuccess = false;
        } else {
          userProfile = dataReceived[0];
          userProfile.CognitoId = userProfile.CognitoID;          
        }
      }

      callbackFunction(invokeSuccess ? userProfile : null, errorMessage);
    });
  }

  // UPDATE USER PROFILE
  updateUserProfile(cognitoId : string, userId: number, firstName : string, lastName : string, alias : string, skillLevelId : number, roles: any, callbackFunction) {
    // Prepare to call Lambda function
    const lambda = new AWS.Lambda({
      region: AWSConstants._AWS_REGION,
      apiVersion: AWSConstants._AWS_API_VERSION
    });

    const pullParams = {
      FunctionName: AWSConstants._AWS_UPDATE_PROFILE,
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify({ 
        dbObject : {
          appUserId : userId,          
          firstName : firstName,
          lastName : lastName,
          alias : alias,          
          skillLevelId : skillLevelId,          
          roles : roles
        }
      })
    };

    console.log("pullParams updateUserProfile");
    console.log(pullParams);

    let invokeSuccess = true;
    const res = lambda.invoke(pullParams, async (err, data) => {

      let dataReceived = JSON.parse(data.Payload.toString());
      console.log("dataReceived updateUserProfile");
      console.log(dataReceived);
      let errorMessage = "";
      let userProfile;
      if (err) {                
        invokeSuccess = false;
        errorMessage = err.toString();
      } 
      else if (dataReceived == null) {
        invokeSuccess = false;
        errorMessage = "General error found on signup"; 
      } 
      else if(dataReceived != null && dataReceived.code != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.message;        
      }
      else if(dataReceived != null && dataReceived.original != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.original.sqlMessage;        
      }
      else if(dataReceived != null && dataReceived.errorMessage != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.errorMessage;        
      }      

      callbackFunction(invokeSuccess ? userProfile : null, errorMessage);
    });
  }
  
  // FAMILYGROUP MEMBERS
  getFamilyGroupList(appUserId: number, callbackFunction) {
    // Prepare to call Lambda function
    const lambda = new AWS.Lambda({
      region: AWSConstants._AWS_REGION,
      apiVersion: AWSConstants._AWS_API_VERSION
    });

    const pullParams = {
      FunctionName: AWSConstants._AWS_DBMNG_APPUSER,
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify({ dbOperation: 'GET_FAMILYGROUPMEMBERS', dbObject : {appUserId: appUserId} })
    };

    
    let invokeSuccess = true;
    const res = lambda.invoke(pullParams, async (err, data) => {

      let dataReceived = JSON.parse(data.Payload.toString());
      console.log("dataReceived getFamilyGroupList");
      console.log(dataReceived);
      let errorMessage = "";
      let arrayResult = [];
      if (err) {                
        invokeSuccess = false;
        errorMessage = err.toString();
      } 
      else if( dataReceived != null && dataReceived != undefined && dataReceived.code != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.message;
      }
      else  if (dataReceived != null && dataReceived != undefined) {        
        arrayResult = dataReceived;        
      }

      callbackFunction(invokeSuccess ? arrayResult : null, errorMessage);
    });
  }

  // FAMILYGROUP DATA
  getFamilyGroupData(familyGroupId : number, callbackFunction){
    // Prepare to call Lambda function
    const lambda = new AWS.Lambda({
      region: AWSConstants._AWS_REGION,
      apiVersion: AWSConstants._AWS_API_VERSION
    });

    const pullParams = {
      FunctionName: AWSConstants._AWS_DBMNG_FAMGROUP,
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify({ dbOperation: 'GET_BY_FAMILYGROUPID', dbObject : {familyGroupId: familyGroupId} })
    };


    let invokeSuccess = true;
    const res = lambda.invoke(pullParams, async (err, data) => {

      let dataReceived = JSON.parse(data.Payload.toString());
      console.log("dataReceived getFamilyGroupList");
      console.log(dataReceived);
      let errorMessage = "";
      let result = new FamilyGroupModel();
      if (err) {                
        invokeSuccess = false;
        errorMessage = err.toString();
      } 
      else if( dataReceived != null && dataReceived != undefined && dataReceived.code != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.code;
      }
      else if(dataReceived != null && dataReceived.original != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.original.sqlMessage;        
      }
      else if(dataReceived != null && dataReceived.errorMessage != undefined)      
      {
        invokeSuccess = false;
        errorMessage = dataReceived.errorMessage;        
      }
      else  if (dataReceived != null && dataReceived != undefined) {        
        result = dataReceived[0];        
      }

      callbackFunction(invokeSuccess ? result : null, errorMessage);
    });
  }

  uploadImage(fileInput: any, fileKey : string) {
    const AWSService = AWS;
    const region = AWSConstants._AWS_REGION;
    const bucketName = AWSConstants._AWS_BUCKET_PICTURES;
    const IdentityPoolId = AWSConstants._AWS_IDENTITY_POOL_ID;
    const file = fileInput.target.files[0];
  
  //Configures the AWS service and initial authorization
    AWSService.config.update({
      region: region,
      credentials: new AWSService.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    });
  
  //adds the S3 service, make sure the api version and bucket are correct
    const s3 = new AWSService.S3({
      apiVersion: '2006-03-01',
      region: 'us-east-1',
      params: { Bucket: bucketName}
    });
  
  //I store this in a variable for retrieval later
    let image = file.name;
  
    s3.upload({ Key: fileKey, Bucket: bucketName, Body: file, ACL: 'public-read'}, function (err, data) {
      console.log("data received");
      console.log(data);
     if (err) {
       console.log(err, 'there was an error uploading your file');
     }
   });
  }

  // authenticateUserPool(user, password, callback) {
  //   //let authenticationData = {
  //   //  Username: user,
  //   //  Password: password,
  //   //};
  //   //let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
  //   //let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(this.poolData);
  //   //let userData = {
  //   //  Username: user,
  //   //  Pool: userPool
  //   //};
  //   //let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

  //   //cognitoUser.authenticateUser(authenticationDetails, {
  //   //  onSuccess: function (result) {
  //   //    let cognitoGetUser = userPool.getCurrentUser();
  //   //    callback.cognitoCallback(null, result);
  //   //    if (cognitoGetUser != null) {
  //   //      cognitoGetUser.getSession(function (err, result) {
  //   //        if (result) {
  //   //          console.log("Authenticated to Cognito User Pools!");
  //   //        }
  //   //      });
  //   //    }
  //   //  },
  //   //  onFailure: function (err) {
  //   //    callback.cognitoCallback(err, null);
  //   //  }
  //   //});
  // }

  // authenticateIdentityPool(user, password, region, callback) {
  //   //let authenticationData = {
  //   //  Username: user,
  //   //  Password: password,
  //   //};
  //   //let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
  //   //let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(this.poolData);
  //   //let userData = {
  //   //  Username: user,
  //   //  Pool: userPool
  //   //};
  //   //let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  //   //let cognitoParams = {
  //   //  IdentityPoolId: this.identityPool,
  //   //  Logins: {}
  //   //};
  //   //let poolId = this.poolData.UserPoolId;

  //   //cognitoUser.authenticateUser(authenticationDetails, {
  //   //  onSuccess: function (result) {
  //   //    let cognitoGetUser = userPool.getCurrentUser();
  //   //    if (cognitoGetUser != null) {
  //   //      cognitoGetUser.getSession(function (err, result) {
  //   //        if (result) {
  //   //          console.log("Authenticated to Cognito User and Identity Pools!");
  //   //          let token = result.getIdToken().getJwtToken();
  //   //          cognitoParams.Logins["cognito-idp." + region + ".amazonaws.com/" + poolId] = token;
  //   //          AWS.config.credentials = new AWS.CognitoIdentityCredentials(cognitoParams);

  //   //           Obtain AWS credentials
  //   //          AWS.config.getCredentials(function () {
  //   //             Access AWS resources here.
  //   //            let creds = {
  //   //              accessKey: AWS.config.credentials.accessKeyId,
  //   //              secretKey: AWS.config.credentials.secretAccessKey,
  //   //              sessionToken: AWS.config.credentials.sessionToken
  //   //            };
  //   //            let additionalParams = {
  //   //              headers: {
  //   //                Authorization: token
  //   //              }
  //   //            };
  //   //            let params = {};
  //   //            let body = {};
  //   //            let apigClient = apigClientFactory.newClient({
  //   //              accessKey: AWS.config.credentials.accessKeyId,
  //   //              secretKey: AWS.config.credentials.secretAccessKey,
  //   //              sessionToken: AWS.config.credentials.sessionToken,
  //   //              region: region // The region where the API is deployed
  //   //            });
  //   //            let apigClientJWT = apigClientFactory.newClient();
  //   //            apigClientJWT.cipInfoGet({}, {}, additionalParams)
  //   //              .then(function (response) {
  //   //                body = response.data.Item;
  //   //                console.log("Retrieving User Attributes from User Pool");
  //   //                if (body != null) {
  //   //                  apigClient.cipPost({}, body, {})
  //   //                    .then(function (response) {
  //   //                      console.log("Send user data to API");
  //   //                    }).catch(function (response) {
  //   //                      console.log(response);
  //   //                    });
  //   //                }
  //   //              }).catch(function (response) {
  //   //                console.log(response);
  //   //              });

  //   //            apigClient.cipGet(params, {})
  //   //              .then(function (response) {
  //   //                console.log("Retrieve data from API");
  //   //                let data = response.data.Items[0];
  //   //                callback.cognitoCallbackWithCreds(null, result, creds, data);
  //   //              }).catch(function (response) {
  //   //                console.log(response);
  //   //              });
  //   //          });
  //   //        }
  //   //      });
  //   //    }
  //   //  },
  //   //  onFailure: function (err) {
  //   //    callback.cognitoCallback(err, null);
  //   //  }
  //   //});

  // }

  // private _serverError(err: any) {
  //   console.log('sever error:', JSON.stringify(err));  // debug
  //   if (err.status === 0) {
  //     return Observable.throw(err.json().error || 'UNAUTHORIZED!!!');
  //   }
  //   if (err instanceof Response) {
  //     return Observable.throw(err.json().error || 'Backend Server Error');
  //   }
  //   // return Observable.throw(err || 'Backend Server Error');
  // }
}
