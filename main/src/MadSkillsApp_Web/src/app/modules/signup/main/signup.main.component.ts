import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpModel } from './../models/signup.model';

import { AuthenticationService } from './../../../services/authentication.service';
import { RoutingConstants } from './../../../misc/app.routes.constants';
import { Session } from 'protractor';
import { SessionConstants } from '../../../misc/app.systen.constants';

@Component({
  selector: 'signup-main',
  templateUrl: './signup.main.component.html',
  styleUrls: []
})
export class SignupMainComponent implements OnInit {

  signUpModel: SignUpModel;
  errorMessage : string;
  urlSignin: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.signUpModel = new SignUpModel();
    this.signUpModel.step = 1;
    this.errorMessage = "";
    this.signUpModel.userName = "";
    this.signUpModel.password = "";
    this.signUpModel.passwordConfirmation = "";    
    this.urlSignin = '/' + RoutingConstants._SIGNIN;
  }

  modelIsValid() {
    // validate boxes and password and all
    return true;
  }

  signUp() {
    console.log("this.signUpModel before call aws");
    console.log(this.signUpModel);
    if (this.modelIsValid()) {
      this.authService.signUpUser(this.signUpModel.userName, this.signUpModel.password, this.handleSignUpCallback);
    }
  }

  handleSignUpCallback = (signUpModel: SignUpModel, errorMessage: string) => {
    if (signUpModel != null) {      
      // in case of success
      console.log("signUpModel returned");
      console.log(signUpModel);
      localStorage.setItem(SessionConstants._SIGNUPSTATE, JSON.stringify(signUpModel));
      this.router.navigate([RoutingConstants._SIGNUPCODE]);
    } else {      
      this.errorMessage = errorMessage;      
      // ToDo: Handle login errors
    }
  }
}
