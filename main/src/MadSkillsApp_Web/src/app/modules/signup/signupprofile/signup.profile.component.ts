import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpModel } from './../models/signup.model';
import { UserSigninModel } from './../../signin/models/signin.model';
import { SignUpProfileModel } from './../models/signup.profile.model';
import { DateModel } from './../models/dateselect.model';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AuthenticationService } from './../../../services/authentication.service';
import { RoutingConstants } from './../../../misc/app.routes.constants';
import { AppMessages } from './../../../misc/app.messages.constants';
import { GlobalFunctions } from './../../../misc/global-functions';
import { Session } from 'protractor';
import { SessionConstants } from '../../../misc/app.systen.constants';

import { SkillLevelList } from './../../skill-level/models/skill-level.model';
import { SelectionList } from './../../common/models/selection-list.model';
import { AwsService } from './../../../services/aws.service';

@Component({
  selector: 'signup-profile',
  templateUrl: './signup.profile.component.html',
  styleUrls: []
})
export class SignupProfileComponent implements OnInit {
  @Input() refreshCallback;
  @Input() modalDialog: BsModalRef;
  @Input() isFromParent : boolean;  

  signUpModel: SignUpModel;
  loggedUser : UserSigninModel;
  
  urlSignin: string;
  skillLevelList : SkillLevelList[];
  errorMessage : string; 
  profile : SignUpProfileModel;
  selectSkillLevel : SkillLevelList;
  selectedSkillLevel : SkillLevelList;
  selectedSkillLevelId : number;
  monthList : SelectionList[];
  selectedMonthId : number;
  yearList : SelectionList[];
  selectedYearId : number;
  dayList : SelectionList[];
  selectedDayId : number;
  selectDay : SelectionList;
  age : number;
  isCoach : boolean;
  isPlayer : boolean;
  isParent : boolean;    

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private awsService : AwsService
  ) {}

  ngOnInit() {
    this.signUpModel = new SignUpModel();
    this.profile = new SignUpProfileModel();
    
    if(this.isFromParent == false || this.isFromParent == undefined){
      this.signUpModel = JSON.parse(localStorage.getItem(SessionConstants._SIGNUPSTATE));
      if(this.signUpModel == null || this.signUpModel == undefined){
        this.router.navigate([RoutingConstants._SIGNUPMAIN]);
      }
      this.signUpModel.step = 4;    
    }
    else{
      this.signUpModel.userName = "";
      this.signUpModel.password = "";
      this.signUpModel.passwordConfirmation = "";
      this.loggedUser = JSON.parse(localStorage.getItem(SessionConstants._USER));
      if(this.loggedUser == null || this.loggedUser == undefined)
        this.router.navigate([RoutingConstants._SIGNIN]);
    }
    
        
    this.urlSignin = '/' + RoutingConstants._SIGNIN;
    this.skillLevelList = [];
    this.selectSkillLevel = new SkillLevelList;

    this.selectDay = new SelectionList();
    this.selectDay.key = -1;
    this.selectDay.value = "<Day>";
    
    this.selectedSkillLevelId =  -1;
    this.selectedMonthId = -1;
    this.selectedYearId = -1;
    this.selectedDayId = -1;
    this.isCoach = false;
    this.isParent = false;
    this.isPlayer = false;

    this.profile.firstName = "";
    this.profile.lastName = "";
    this.profile.alias = "";

    this.awsService.getSkillLevelList ( this.handleGetSkillLevelCallback);
    this.monthList = GlobalFunctions.getMonthList();
    this.yearList = GlobalFunctions.getYearList(1950, (new Date()).getFullYear());    
    this.dayList = [];
    this.dayList.push(this.selectDay);
    this.age = -1;

    this.errorMessage = "";
  }
  
  handleGetSkillLevelCallback = (list: SkillLevelList[], errorMessage: string) => {
    if (list != null) {      
      // in case of success     
      this.skillLevelList = list;
      
      this.selectSkillLevel.SkillLevelId = -1;
      this.selectSkillLevel.Name = AppMessages._SEL_SKILL_LEVEL;
      this.skillLevelList = [].concat(this.selectSkillLevel, this.skillLevelList);     
    } else {      
      this.errorMessage = errorMessage;      
      // ToDo: Handle login errors
    }
  }

  private loadDaysInMonth(){
    if(this.selectedYearId > -1 && this.selectedMonthId){
      this.dayList = GlobalFunctions.getDaysInMonthList(this.selectedYearId, this.selectedMonthId);
      this.calculateAge();
    }
    else{
      this.dayList = [];
      this.dayList.push(this.selectDay);
    }
  }

  private calculateAge(){
    if(this.selectedYearId > -1 && this.selectedMonthId && this.selectedDayId > -1){
      this.age = GlobalFunctions.getAge(this.selectedYearId, this.selectedMonthId, this.selectedDayId);
    }
    else
      this.age = -1;    
  }

  modelIsValid(): boolean {
    let isValid = true;
    if(this.isFromParent == false || this.isFromParent == undefined){
      if(this.age < 16 || this.profile.firstName.trim().length == 0 || this.profile.lastName.trim().length == 0 || this.profile.alias.trim().length == 0 || (!this.isCoach && !this.isParent && !this.isPlayer))
        isValid = false;      
    }
    else {
      if(this.profile.firstName.trim().length == 0 || this.profile.lastName.trim().length == 0 || this.profile.alias.trim().length == 0 || (!this.isParent && !this.isPlayer))
      isValid = false;      
    }
    return isValid;
  }

  signUp() {
    if (this.modelIsValid()) {
      console.log("model is valid");
      if(this.isFromParent == false || this.isFromParent == undefined){
        this.authService.signUpAppUser(this.signUpModel.userName, 
          this.profile.firstName, 
          this.profile.lastName, 
          this.profile.alias, 
          new Date(this.selectedYearId, this.selectedMonthId-1, this.selectedDayId), 
          this.signUpModel.userEmail, 
          this.selectedSkillLevelId, 
          this.isCoach, 
          this.isParent, 
          this.isPlayer, 
          this.handleSignUpProfileCallback);
      }
      else{
        console.log("this.signUpModel before sign up");
        console.log(this.signUpModel);
        console.log("this.isCoach before sign up");
        console.log(this.isCoach);
        console.log("this.isParent before sign up");
        console.log(this.isParent);
        console.log("this.isPlayer before sign up");
        console.log(this.isPlayer);

        this.authService.signUpFamilyMember(    
          this.signUpModel.userName,
          this.signUpModel.password,
          this.loggedUser.familyGroupCode,    
          this.loggedUser.familyGroupId,      
          this.profile.firstName, 
          this.profile.lastName, 
          this.profile.alias, 
          new Date(this.selectedYearId, this.selectedMonthId-1, this.selectedDayId), 
          this.profile.email, 
          this.selectedSkillLevelId, 
          this.isCoach, 
          this.isParent, 
          this.isPlayer, 
          this.handleSignUpFamilyMemberCallback);
      }
    }
  }

  handleSignUpProfileCallback = (signUpModel: SignUpModel, errorMessage : string) => {    
    if (signUpModel != null) {      
      console.log("Row inserted succesfully");
         
      let signinData = new UserSigninModel();
      signinData.username = this.signUpModel.userName;
      signinData.password = this.signUpModel.password;  
      console.log("signinData");
      console.log(signinData); 
      this.authService.signinUser(signinData.username, signinData.password, signinData.familyGroupCode, this.handleSignInCallback);
      
    } else {
      // ToDo: Handle login errors
      this.errorMessage = errorMessage;      
    }
  }

  handleSignUpFamilyMemberCallback = (signUpModel: SignUpModel, errorMessage : string) => {    
    if (signUpModel != null) {      
      console.log("family member inserted succesfully");
      console.log("this.signUpModel");
      console.log(this.signUpModel);      
      if (this.refreshCallback) {
        this.refreshCallback();
      }  
      this.modalDialog.hide();            
      
    } else {
      // ToDo: Handle login errors
      this.errorMessage = errorMessage;      
    }
  }

  handleSignInCallback = (signInModel: UserSigninModel, errorMessage : string) => {    
    if (errorMessage == "") {     
      console.log("user logged in");      
      console.log("signInModel"); 
      console.log(signInModel); 
      this.authService.openUserSession(signInModel);
      this.router.navigate([RoutingConstants._DASHBOARD]);
    } else {
      // ToDo: Handle login errors
      this.errorMessage = errorMessage;      
    }
  }
}
