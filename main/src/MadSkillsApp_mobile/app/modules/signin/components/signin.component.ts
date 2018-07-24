import{Component,OnInit} from '@angular/core';

import { AuthenticationService } from './../../../services/authentication.service';
import { UserSigninModel } from './../models/signin.model';

@Component({
    selector: 'ns-signin',
    moduleId: module.id,
    templateUrl: './signin.component.html',

})


export class SigninComponent implements OnInit{

    userModel : UserSigninModel;
    submitted: boolean;

    ngOnInit(){
        this.userModel = new UserSigninModel();
  
    }

    constructor( 
        private authService : AuthenticationService
    ) { }

    signIn() {
        this.submitted = true;
        this.authService.signinUser(this.userModel.userName, this.userModel.password, this.handleSignInCallback);
    }
    
    private handleSignInCallback(signInModel: UserSigninModel) {
        if (signInModel != null) {
            // in case of success, save the user on the localStorage
            this.authService.openUserSession(signInModel);
        } else {
            // ToDo: Handle login errors

        }
    }

    
}

