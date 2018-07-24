import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutingConstants } from './../../misc/app.routes.constants';
import { ModalModule } from 'ngx-bootstrap/modal';
// Auth Guard

import { AuthenticatedLayoutComponent } from './../../components/layouts/authenticated/layout.authenticated.component'
import { FamilyGroupItemComponent } from './component/familygroup.item.component';
import { FamilyGroupListComponent } from './component/familygroup.list.component';
import { FamilyGroupMemberComponent } from './component/familygroup.member.component';
import { SignupModule } from "./../signup/signup.module";
import { SignupProfileComponent } from "./../signup/signupprofile/signup.profile.component";

import { ProfileModule } from "./../profile/profile.module";
import { ProfileComponent } from "./../profile/components/profile.component";

//TODO exportar el login y registro
@NgModule({
  declarations: [FamilyGroupItemComponent, FamilyGroupListComponent, FamilyGroupMemberComponent ],
  exports: [FamilyGroupItemComponent, FamilyGroupListComponent, FamilyGroupMemberComponent],
  imports: [
    FormsModule,
    CommonModule,  
    SignupModule, 
    ProfileModule, 
    ModalModule.forRoot(),
    RouterModule.forRoot([
      {
        path: RoutingConstants._FAMILYGROUP, component: AuthenticatedLayoutComponent,
        //canActivate: [AuthGuard],
        children: [{ path: '', component: FamilyGroupListComponent }]
      },
      {
        path: RoutingConstants._FAMILYGROUP, component: AuthenticatedLayoutComponent,
        //canActivate: [AuthGuard],
        children: [{ path: 'new', component: FamilyGroupMemberComponent }]
      },
      {
        path: RoutingConstants._SIGNUPDISCLOSURE, component: AuthenticatedLayoutComponent,
        //canActivate: [AuthGuard],
        children: [{ path: 'edit', component: FamilyGroupMemberComponent }]
      }
    ])

  ],
  providers: []
})

export class FamilyGroupModule { }
