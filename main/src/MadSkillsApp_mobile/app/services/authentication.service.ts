import { Injectable } from '@angular/core';

import { AwsService } from './aws.service';
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

  signinUser(user: string, password: string, signInCallback) {
    // this.awsService.authenticateUserPool(user, password, callback);
    this.awsService.signInUser(user, password, signInCallback);
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

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(SessionConstants._USER);
  }
}
