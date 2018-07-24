import{Component,OnInit} from '@angular/core';
import { Switch } from "ui/switch";
import {Router} from '@angular/router';

@Component({
    selector: 'ns-signin',
    moduleId: module.id,
    templateUrl: './signin.component.html',

})


export class SigninComponent implements OnInit{

    constructor(private router :Router) { }
    
    public onFirstChecked(args) {
        
      }

    goToFa(){
       
            //this.router.navigate(['family']);
      
    }
   

    ngOnInit(){
      

    }
}

