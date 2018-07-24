import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  Response,
  Request,
  RequestOptions,
  RequestMethod
} from '@angular/http';

import { AwsService } from './aws.service';
import { RoutingConstants } from './../misc/app.routes.constants';
import { SessionConstants } from './../misc/app.systen.constants';

import { UserSigninModel } from './../modules/signin/models/signin.model';

@Injectable()
export class AuthenticationService {
  constructor(public awsService: AwsService) {}

  private _currentUser: UserSigninModel;

  currentUser() {
    if (!this._currentUser) {
      this.currentUser = JSON.parse( localStorage.getItem(SessionConstants._USER) );
    }
    return this._currentUser;
  }

  signinUser(user: string, password: string, familyCode : string, signInCallback) {
    // this.awsService.authenticateUserPool(user, password, callback);
    this.awsService.signInUser(user, password, familyCode, signInCallback);
  }

  signoutUser(signOutCallback) {
    var user = this.currentUser();
    if (user) {
      //this.awsService.signinUser(user.username, signOutCallback);
    }
  }

  openUserSession(user: UserSigninModel) {
    localStorage.setItem(SessionConstants._TOKEN, user.accessToken);
    localStorage.setItem(SessionConstants._USER, JSON.stringify(user));
  }

  signinFamilyMember(user: string, password: string, familykey: string) {
    // Call to awsService to proceed with sign in the family group
    // on case of success, save the user on the localStorage
  }

  signUpUser(userName: string, password: string, signUpCallback) {
    // Call to awsService to proceed with sign up
    this.awsService.signUpUser(userName, password, signUpCallback);
  }

  validateCode(userName: string, emailCode: string, validateCodeCallback) {
    // Call to awsService to proceed with sign up
    this.awsService.validateCode(userName, emailCode, validateCodeCallback);
  }

  resendCode(userName: string, validateCodeCallback) {
    // Call to awsService to proceed with sign up
    this.awsService.resendCode(userName, validateCodeCallback);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(SessionConstants._USER);
  }

  signUpAppUser(cognitoId: string, firstName: string, lastName: string, alias : string, birthDate : Date, email: string, skillLevelId: number, isCoach: boolean, isParent : boolean, isPlayer : boolean, callbackFunction) {
    // Call to awsService to proceed with sign up
    this.awsService.signUpAppUser(cognitoId, firstName, lastName, alias, birthDate, email, skillLevelId, isCoach, isParent, isPlayer, callbackFunction);
  }

  signUpFamilyMember(userName: string, password: string, familyGroup: string, familyGroupId : number, firstName: string, lastName: string, alias : string, birthDate : Date, email: string, skillLevelId: number, isCoach: boolean, isParent : boolean, isPlayer : boolean, callbackFunction) {
    // Call to awsService to proceed with sign up
    this.awsService.signUpFamilyMember(
      userName, 
      password, 
      familyGroup, 
      familyGroupId, 
      firstName, 
      lastName, 
      alias, 
      birthDate, 
      email, 
      skillLevelId, 
      isCoach, 
      isParent, 
      isPlayer, 
      callbackFunction);
  }

  updateAppUser(cognitoId: string, appUserId: number, firstName: string, lastName: string, alias : string, skillLevelId: number, roles: any, callbackFunction) {
    // Call to awsService to proceed with sign up
    this.awsService.updateUserProfile(cognitoId, appUserId, firstName, lastName, alias, skillLevelId, roles, callbackFunction);
  }
}
