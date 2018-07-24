import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpModel } from './../models/signup.model'

import { AuthenticationService } from './../../../services/authentication.service';
import { RoutingConstants } from './../../../misc/app.routes.constants';
import { Session } from 'protractor';
import { SessionConstants } from '../../../misc/app.systen.constants';

@Component({
  selector: 'signup-valem',
  templateUrl: './signup.validemail.component.html',
  styleUrls: []
})
export class SignupVEComponent implements OnInit {

  signUpModel: SignUpModel;
  urlSignup: string;
  errorMessage : string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {

  }

  ngOnInit() {
    this.signUpModel = new SignUpModel();
    this.signUpModel = JSON.parse(localStorage.getItem(SessionConstants._SIGNUPSTATE));
    console.log("this.signUpModel received verification code");
    console.log(this.signUpModel);
    this.signUpModel.step = 2;
    this.signUpModel.emailCode = "";
    this.errorMessage = "";
    this.urlSignup = '/' + RoutingConstants._SIGNUPMAIN;
  }

  modelIsValid() {
    // validate boxes and password and all
    return true;
  }

  validateCode() {
    if (this.modelIsValid()) {
      // Call to the authentication service to check the code      
      this.authService.validateCode(this.signUpModel.userName, this.signUpModel.emailCode , this.handleValidateCodeCallback);
    }
  }

  handleValidateCodeCallback = (signUpModel: SignUpModel, errorMessage : string) => {
    if(errorMessage == ""){            
      localStorage.setItem(SessionConstants._SIGNUPSTATE, JSON.stringify(this.signUpModel));      
      this.router.navigate([RoutingConstants._SIGNUPDISCLOSURE]);      
    }   
    else
     this.errorMessage = errorMessage; 
  }

  sendCodeAgain() {
    this.authService.resendCode(this.signUpModel.userName, this.handleResendCodeCallback);
  }

  handleResendCodeCallback = (errorMessage : string) => {
    console.log("errorMessage received on resend code");
    console.log(errorMessage);
    if(errorMessage != "")         
      this.errorMessage = errorMessage;
  }
}
