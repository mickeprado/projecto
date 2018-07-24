import React from 'react';
import { Platform, StyleSheet, Text, View, Button  } from 'react-native';

var AWS = require('aws-sdk/dist/aws-sdk-react-native');
AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:4d335717-e0f2-4a65-96a6-3c6a08d66502'
  })
});

export default class App extends React.Component {
  signSample()
  {
    const lambda = new AWS.Lambda({
      region: 'us-east-1',
      apiVersion:''
    });
    const pullParams = {
      FunctionName: 'madskill-signin',
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify({ username: 'ivides@mosbit.com', password: 'Kalagua1!' })
    };
    console.log("lambda config");
    console.log(lambda);
    console.log("lambda pullParam");
    console.log(pullParams);
    //const signInModel = new UserSigninModel();
    let invokeSuccess = true;
    const res = lambda.invoke(pullParams, async (err, data) => {
      // if (JSON.parse(data.Payload.toString()).errorMessage || JSON.parse(data.Payload.toString()).code === 'NotAuthorizedException') {
      //   invokeSuccess = false;
      //   console-log("invoke error: " + err);
      // } else {
      //   signInModel.userName = user;
      //   signInModel.password = password;
      //   signInModel.accessToken = JSON.parse(data.Payload.toString()).accessToken.jwtToken;
      //   signInModel.idToken = JSON.parse(data.Payload.toString()).idToken.jwtToken;
      // }
      // console-log("model " + data);
      console.log("error")
      console.log(err);

      console.log("data")
      console.log(data);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This sample call to AWS sign lambda</Text>
        <Button onPress={this.signSample} title="Call AWS" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
