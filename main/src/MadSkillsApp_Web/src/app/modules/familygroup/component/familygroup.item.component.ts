import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSigninModel } from './../../signin/models/signin.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


import { AuthenticationService } from './../../../services/authentication.service';
import { RoutingConstants } from './../../../misc/app.routes.constants';
import { AppMessages } from './../../../misc/app.messages.constants';
import { GlobalFunctions } from './../../../misc/global-functions';
import { Session } from 'protractor';
import { SessionConstants, AWSConstants } from '../../../misc/app.systen.constants';

import { AwsService } from './../../../services/aws.service';
import { AppUserProfileModel } from './../../profile/models/appUserProfile.model';

@Component({
  selector: 'famgroup-item',
  templateUrl: './familygroup.item.component.html'
})
export class FamilyGroupItemComponent {
  
    
  errorMessage : string; 
  @Input() userProfile : AppUserProfileModel;
  @Input() groupOwner : number;
  @ViewChild('editRowModal') editRowModal: TemplateRef<any>;

  private editModalDialog: BsModalRef;
  private refreshCallback: () => void;
  selectedRow : AppUserProfileModel;

  constructor(private modalService: BsModalService, private awsService : AwsService) {}

  ngOnInit() {    
    this.errorMessage = "";
    this.userProfile.Picture = AWSConstants._AWS_BUCKET_PICTURES_URL + this.userProfile.Picture;
    console.log("this.userProfile item");
    console.log(this.userProfile);
  }

  private showEditModal = (item, refreshCallback) => {
    this.selectedRow = item; // Convert the received column data object into our safe type model object
    this.selectedRow.GroupOwner = this.groupOwner;
    this.editModalDialog = this.modalService.show(this.editRowModal);
    this.refreshCallback = refreshCallback;
  }
 }

