import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpModel } from './../models/signup.model';

import { AuthenticationService } from './../../../services/authentication.service';
import { RoutingConstants } from './../../../misc/app.routes.constants';
import { Session } from 'protractor';
import { SessionConstants } from '../../../misc/app.systen.constants';

@Component({
  selector: 'signup-disc',
  templateUrl: './signup.disclosure.component.html'
})
export class SignupdisclosureComponent implements OnInit {

  signUpModel: SignUpModel;
  urlSignin: string;
  termsAccepted : boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.signUpModel = new SignUpModel();
    this.signUpModel = JSON.parse(localStorage.getItem(SessionConstants._SIGNUPSTATE));    
    this.signUpModel.step = 3;    
    this.termsAccepted = false;            
    this.urlSignin = '/' + RoutingConstants._SIGNIN;
  }

  modelIsValid() : boolean{
    if(this.termsAccepted)
      return true;
    else 
      return false;
  }

  acceptTerms() {
    if (this.modelIsValid()) {      
      localStorage.setItem(SessionConstants._SIGNUPSTATE, JSON.stringify(this.signUpModel));
      this.router.navigate([RoutingConstants._SIGNUPPROFILE]);
    }
  }
  
}
