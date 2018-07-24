'use strict';

import AWSConstants from './constants';

const AWS = require('aws-sdk/dist/aws-sdk-react-native');

const _settings = {
  region: AWSConstants._AWS_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AWSConstants._AWS_IDENTITY_POOL_ID
  })
};

class AwsLambdaServiceClass 
{
  constructor() {
    this.lambda = null;
    this.configure();          
  }

  configure(){
    console.log('configure lambda service');

    AWS.config.update(_settings);
    this.lambda = new AWS.Lambda({
        region: AWSConstants._AWS_REGION,
        apiVersion: AWSConstants._AWS_API_VERSION
      });
  }

  invokeAsync(functionName, parameters){
    var _pullParams = {
      FunctionName: functionName,
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify(parameters)
    };
    console.log('call labda ',functionName);

      return  new Promise((resolve, reject) => {
        const res = this.lambda.invoke(_pullParams, async (err, data) =>{
         //let resp = { isOk : false, error:"error in lambda invoke", exception: err, data: data };
          if (err) {
            reject ( { isOk : false, error:"error in lambda invoke", exception: err, data: data });
          } 
           // resp.isOk = true;
            resolve ( { isOk : true,  data: data } );          
        });
      });


  }
}

export default new AwsLambdaServiceClass();