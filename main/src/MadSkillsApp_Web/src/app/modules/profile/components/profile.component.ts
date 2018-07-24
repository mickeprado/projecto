import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSigninModel } from './../../signin/models/signin.model';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AuthenticationService } from './../../../services/authentication.service';
import { RoutingConstants } from './../../../misc/app.routes.constants';
import { AppMessages } from './../../../misc/app.messages.constants';
import { GlobalFunctions } from './../../../misc/global-functions';
import { Session } from 'protractor';
import { SessionConstants, AWSConstants, AppConstants } from '../../../misc/app.systen.constants';

import { SkillLevelList } from './../../skill-level/models/skill-level.model';
import { SelectionList } from './../../common/models/selection-list.model';
import { AwsService } from './../../../services/aws.service';
import { AppUserProfileModel } from './../models/appUserProfile.model';
import { RoleModel } from './../models/appUserRole.model';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: []
})
export class ProfileComponent implements OnInit {
  @Input() refreshCallback;
  @Input() idEditing;  
  @Input() groupOwner;  
  @Input() modalDialog: BsModalRef;
  userProfile: AppUserProfileModel;
  
  urlSignin: string;
  skillLevelList : SkillLevelList[];
  errorMessage : string; 
  
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
  isCoach : boolean;
  isPlayer : boolean;
  isParent : boolean;  
  isOwner : boolean;  
  loggedUser : UserSigninModel;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private awsService : AwsService
  ) {}

  ngOnInit() {
    console.log("ngOnInit profile");
    console.log("this.idEditing profile");
    console.log(this.idEditing);
    this.userProfile = new AppUserProfileModel();
    this.loggedUser = new UserSigninModel();
    this.loggedUser = JSON.parse(localStorage.getItem(SessionConstants._USER));
    if(this.idEditing == null || this.idEditing == undefined){      
      this.userProfile.AppUserId = this.loggedUser.appUserId;
      this.isCoach = this.loggedUser.isCoach;
      this.isParent = this.loggedUser.isParent;
      this.isPlayer = this.loggedUser.isPlayer;      
      this.isOwner = (this.userProfile.AppUserId == this.groupOwner);  
      this.userProfile.UserName = this.loggedUser.username;
    }
    else{
      
      this.userProfile.AppUserId = this.idEditing;     
      this.isOwner = (this.userProfile.AppUserId == this.groupOwner);    
    }

    
    this.skillLevelList = [];
    this.selectSkillLevel = new SkillLevelList;

    this.selectDay = new SelectionList();
    this.selectDay.key = -1;
    this.selectDay.value = "<Day>";
    
    this.selectedSkillLevelId =  -1;
    this.selectedMonthId = -1;
    this.selectedYearId = -1;
    this.selectedDayId = -1;
    

    this.userProfile.FirstName = "";
    this.userProfile.LastName = "";
    this.userProfile.Alias = "";

    this.awsService.getSkillLevelList ( this.handleGetSkillLevelCallback);
    this.awsService.getUserProfile (this.userProfile.AppUserId, this.handleGetUserProfileCallback);
    this.monthList = GlobalFunctions.getMonthList();
    this.yearList = GlobalFunctions.getYearList(1950, (new Date()).getFullYear());    
    this.dayList = [];
    this.dayList.push(this.selectDay);    

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

  handleGetUserProfileCallback = (userProfile : AppUserProfileModel, errorMessage : string) =>{
    if (userProfile != null) {      
      // in case of success     
      this.userProfile = userProfile;      
      this.selectedSkillLevelId = userProfile.SkillLevelId;
      console.log("userProfile received");
      console.log(userProfile);
      if(this.idEditing != null && this.idEditing != undefined && this.userProfile.AppUserId != this.groupOwner){                
        this.userProfile.UserName = this.userProfile.CognitoId.substr(this.userProfile.CognitoId.indexOf("_") +1, this.userProfile.CognitoId.length - this.userProfile.CognitoId.indexOf("_"));
      }
      else{
        this.userProfile.UserName = this.userProfile.CognitoId;
      }
      //this.userProfile.BirthDate = new Date(this.userProfile.BirthDate);     
      
      this.userProfile.Picture = AWSConstants._AWS_BUCKET_PICTURES_URL + this.userProfile.Picture;      
      console.log("userProfile received");
      console.log(userProfile);
      this.selectSkillLevel.SkillLevelId = -1;
      this.selectSkillLevel.Name = AppMessages._SEL_SKILL_LEVEL;
      this.skillLevelList = [].concat(this.selectSkillLevel, this.skillLevelList);    
      
      this.isCoach = (this.userProfile.Roles.find( role => role.RoleId === AppConstants._APP_ROLE_COACH) != undefined);
      this.isParent = (this.userProfile.Roles.find( role => role.RoleId === AppConstants._APP_ROLE_PARENT) != undefined);
      this.isPlayer = (this.userProfile.Roles.find( role => role.RoleId === AppConstants._APP_ROLE_PLAYER) != undefined);

      console.log("this.Roles from array");
      console.log(this.isCoach);
      console.log(this.isParent);
      console.log(this.isPlayer);

    } else {      
      this.errorMessage = errorMessage;      
      // ToDo: Handle login errors
    }
  }

  private loadDaysInMonth(){
    if(this.selectedYearId > -1 && this.selectedMonthId){
      this.dayList = GlobalFunctions.getDaysInMonthList(this.selectedYearId, this.selectedMonthId);
      //this.calculateAge();
    }
    else{
      this.dayList = [];
      this.dayList.push(this.selectDay);
    }
  } 

  modelIsValid(): boolean {
    let isValid = true;
    if(this.userProfile.FirstName.trim().length == 0 || this.userProfile.LastName.trim().length == 0 || this.userProfile.Alias.trim().length == 0 || (!this.isCoach && !this.isParent && !this.isPlayer))
      isValid = false;
      
    return isValid;
  }

  updateProfile() {
    if (this.modelIsValid()) {
      console.log("model is valid updateProfile");
      console.log("this.userProfile");
      console.log(this.userProfile);
      let roles : RoleModel[];

      roles = [];
      if(this.isCoach)        
        roles.push({ "RoleId" : AppConstants._APP_ROLE_COACH});
      if(this.isParent)        
        roles.push({ "RoleId" : AppConstants._APP_ROLE_PARENT});
      if(this.isPlayer)        
        roles.push({ "RoleId" : AppConstants._APP_ROLE_PLAYER});
        
      if(this.idEditing != null && this.idEditing != undefined)  
        this.authService.updateAppUser(this.userProfile.CognitoId ,this.userProfile.AppUserId, this.userProfile.FirstName, this.userProfile.LastName, this.userProfile.Alias, this.userProfile.SkillLevelId, roles, this.handleUpdateProfileEditCallback);
      else
        this.authService.updateAppUser(this.userProfile.CognitoId ,this.userProfile.AppUserId, this.userProfile.FirstName, this.userProfile.LastName, this.userProfile.Alias, this.userProfile.SkillLevelId, roles, this.handleUpdateProfileCallback);
    }
  }
  

  handleUpdateProfileCallback = (userProfile: AppUserProfileModel, errorMessage : string) => {    
    if (errorMessage != "") {
      this.errorMessage = errorMessage;           
    } else {      
      this.router.navigate([RoutingConstants._DASHBOARD]);
    }
  }

  fileEvent(fileInput: any){    
    this.awsService.uploadImage(fileInput, this.userProfile.CognitoId.toString() + ".png");
  }

  handleUpdateProfileEditCallback = (userProfile: AppUserProfileModel, errorMessage : string) => {    
    if (errorMessage != "") {
      this.errorMessage = errorMessage;           
    } else {      
      
      if (this.refreshCallback) {
        this.refreshCallback();
      }  
      this.modalDialog.hide();   
      this.router.navigate([RoutingConstants._FAMILYGROUP]);
    }
  }
}
