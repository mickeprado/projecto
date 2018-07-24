import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSigninModel } from './../../signin/models/signin.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { RoutingConstants } from './../../../misc/app.routes.constants';
import { AppMessages } from './../../../misc/app.messages.constants';
import { GlobalFunctions } from './../../../misc/global-functions';
import { Session } from 'protractor';
import { SessionConstants } from '../../../misc/app.systen.constants';

import { AwsService } from './../../../services/aws.service';
import { AppUserProfileModel } from './../../profile/models/appUserProfile.model';
import { FamilyGroupModel } from './../../familygroup/models/familyGroup.model';


@Component({
  selector: 'familygrouplist',
  templateUrl: './familygroup.list.component.html'
})
export class FamilyGroupListComponent { 
  @ViewChild('newRowModal') newRowModal: TemplateRef<any>;  
  
  membersList : AppUserProfileModel[];
  errorMessage : string;  
  groupOwner : number;

  private loggedUser = new UserSigninModel();

  private newModalDialog: BsModalRef;  
  private refreshCallback: () => void;

  constructor(private modalService: BsModalService, private awsService : AwsService) {}

  ngOnInit() {    
    this.errorMessage = "";    
    this.membersList = [];    
    this.loggedUser = JSON.parse(localStorage.getItem(SessionConstants._USER));
    console.log("this.loggedUser");
    console.log(this.loggedUser);

    this.awsService.getFamilyGroupList(this.loggedUser.appUserId, this.handleGetFamilyMembersCallback);

    this.awsService.getFamilyGroupData(this.loggedUser.familyGroupId, this.handleGetFamilyDataCallback);

    /*for(var i= 1; i<= 5; i++){
      let member = new AppUserProfileModel();
      member.FirstName = "Member" + i.toString()  + " Name";
      member.LastName =  i.toString()  + " Last Name";
      member.Picture = "../../../assets/img/a"+ i.toString() +".jpg";
      member.Email = "member0" + i.toString() +"@mail.com";
      member.BirthDate = (new Date(1970,i,i));
      this.membersList.push(member);
    }
    console.log("this.membersList");
      console.log(this.membersList);   */
    

  }


  private showAddModal = (item, refreshCallback) => {
    this.newModalDialog = this.modalService.show(this.newRowModal);
    this.refreshCallback = refreshCallback;    
  }  



  handleGetFamilyMembersCallback = (membersList: AppUserProfileModel[], errorMessage : string) => {    
    if (membersList != null) {
      this.membersList = membersList;
      console.log("family members extracted succesfully");
      console.log("this.membersList");
      console.log(this.membersList);                 
      
    } else {
      // ToDo: Handle login errors
      this.errorMessage = errorMessage;      
    }
  }

  handleGetFamilyDataCallback = (data: FamilyGroupModel, errorMessage : string) => {    
    if (data != null) {
      this.groupOwner = data.OwnerAppUserId;                     
      
    } else {
      // ToDo: Handle login errors
      this.errorMessage = errorMessage;      
    }
  }
}



