import { Component } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  "name": String;
  "username": String;
  "email": String;
  "password": String;

  constructor (private validateService: ValidateService,
    private toastr: ToastrService){}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
       // Required Fields
       if(!this.validateService.validateRegister(user)){
        //console.log('Please fill in all the Fields');
        this.toastr.show('Please fill in all fields');
        //return false;
       }
   
       // Validate Email
       if(!this.validateService.validateEmail(user.email)){
        //console.log('Please use a valid email');
        this.toastr.show('Please use a valid email');
        //return false;
       }
  }
}
