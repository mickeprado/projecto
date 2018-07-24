import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from './../notifications/notifications.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionConstants, AWSConstants } from './../../misc/app.systen.constants';
import { RoutingConstants } from './../../misc/app.routes.constants';
import { UserSigninModel } from './../../modules/signin/models/signin.model';

@Component({
  selector: 'auth-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  private userData : UserSigninModel;
  userName : string;
  pictureSource : string;

  constructor(private route: ActivatedRoute,
    private router: Router
  ) {
    this.userData = JSON.parse(localStorage.getItem(SessionConstants._USER));
    if(this.userData == null || this.userData == undefined)
      this.router.navigate([RoutingConstants._SIGNIN]);
    else{
      console.log("this.userData header constructor");
      console.log(this.userData);
      this.userName = this.userData.firstName + " " + this.userData.lastName;
      this.pictureSource = AWSConstants._AWS_BUCKET_PICTURES_URL + this.userData.picture;      
    }
  }

  ngOnInit(){
    
  }

  private signOut(){
    console.log("signout called");
    localStorage.removeItem(SessionConstants._USER);
    localStorage.removeItem(SessionConstants._TOKEN);
    localStorage.removeItem(SessionConstants._SIGNUPSTATE);
    this.router.navigate([RoutingConstants._SIGNIN]);
  }

  private editProfile(){
    this.router.navigate([RoutingConstants._PROFILE]);
  }  
 }
