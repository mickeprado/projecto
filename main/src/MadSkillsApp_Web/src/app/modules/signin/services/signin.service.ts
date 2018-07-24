import { Injectable } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestMethod } from '@angular/http';

import { CognitoIdentity, CognitoIdentityServiceProvider } from 'aws-sdk';

import { AWSConstants, DateTimeFormats, SessionConstants } from './../../../misc/app.systen.constants';
import { UserSigninModel } from './../models/signin.model';


@Injectable()

export class AuthenticationService {

  userLoginModel: UserSigninModel;
  constructor() { }

  private validatePropertiesModel(userModel: UserSigninModel) {
    if (userModel.password === '' || userModel.password === undefined || userModel.username === '' || userModel.username === undefined) {
      return false;
    }
    return true;
  }
}
