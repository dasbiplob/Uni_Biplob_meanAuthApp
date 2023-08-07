import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  "username": String;
  "password": String;

  constructor(public authService:AuthService,
    private router: Router,
    private toastr: ToastrService
    ){}

    dataAuth: any;

  onLoginSubmit(){
    const user = {
      "username":this.username,
      "password":this.password
    }
    
    this.authService.authenticateUser(user)
    .subscribe(data => {
      this.dataAuth = data;
        if(this.dataAuth.success){
          this.authService.storeUserData(this.dataAuth.token, this.dataAuth.user);
          this.toastr.success('Your now logged in!');
          this.router.navigate(['dashboard']);
        }else{
          this.toastr.error(this.dataAuth.msg);
          this.router.navigate(['login']);
        }
    });
  }

}
