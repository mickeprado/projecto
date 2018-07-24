import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

require("nativescript-nodeify");
import * as AWS from 'aws-sdk';

import { AWSConstants } from './../misc/app.systen.constants';

import { UserSigninModel } from './../modules/signin/models/signin.model';


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

  signInUser(user: string, password: string, handleSignInCallback) {
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
      Payload: JSON.stringify({ userName: user, password: password })
    };

    const signInModel = new UserSigninModel();
    let invokeSuccess = true;
    const res = lambda.invoke(pullParams, async (err, data) => {
      if (err) {
        // TODO: Add error handling
        alert(err);
        invokeSuccess = false;
      } else {
        if (JSON.parse(data.Payload.toString()).errorMessage || JSON.parse(data.Payload.toString()).code === 'NotAuthorizedException') {
          invokeSuccess = false;
        } else {
          signInModel.userName = user;
          signInModel.password = password;
          signInModel.accessToken = JSON.parse(data.Payload.toString()).accessToken.jwtToken;
          signInModel.idToken = JSON.parse(data.Payload.toString()).idToken.jwtToken;
        }
      }

      handleSignInCallback(invokeSuccess ? signInModel : null);
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
