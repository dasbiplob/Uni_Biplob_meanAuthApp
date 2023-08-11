import { Component } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    private toastr: ToastrService,
    private authService: AuthService,
    private router:Router){}

dataRegister:any={}

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
        this.toastr.info('Please fill in all fields');
        return false;
       }
   
       // Validate Email
       if(!this.validateService.validateEmail(user.email)){
        //console.log('Please use a valid email');
        this.toastr.error('Please use a valid email');
        return false;
       }


       //Register User
       this.authService.registerUser(user)
       .subscribe(data =>{
        this.dataRegister = data;
        if(this.dataRegister.success){
          this.toastr.success('Your now registered and login!');
          this.router.navigate(['/login']);
        }else{
          this.toastr.error('Something Went Wrong!');
          this.router.navigate(['/register']);
        }

       });
  }
}
