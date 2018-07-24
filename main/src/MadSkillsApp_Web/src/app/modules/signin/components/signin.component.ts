import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserSigninModel } from './../models/signin.model';
import { AuthenticationService } from './../../../services/authentication.service';

import { RoutingConstants } from './../../../misc/app.routes.constants';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
  userModel: UserSigninModel;
  submitted: boolean;
  urlForgot: string;
  urlSignup: string;
  errorMessage : string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.userModel = new UserSigninModel();
    this.urlForgot = '/' + RoutingConstants._FORGOTPWD;
    this.urlSignup = '/' + RoutingConstants._SIGNUPMAIN;
    this.errorMessage = "";
  }

  signIn() {
    this.submitted = true;
    this.authService.signinUser(this.userModel.username, this.userModel.password, this.userModel.familyGroupCode, this.handleSignInCallback);
  }

  private handleSignInCallback = (signInModel: UserSigninModel, errorMessage: string) =>{
    if (signInModel != null) {      
      this.authService.openUserSession(signInModel);
      this.router.navigate([RoutingConstants._DASHBOARD]);
    } else {
      // ToDo: Handle login errors
      this.errorMessage = errorMessage;
    }
  }
}
