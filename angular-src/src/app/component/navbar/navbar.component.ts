import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

    onLogoutClick(){
      this.authService.logOut();
      this.toastr.show('You are Logged Out!');
      this.router.navigate(['/login']);
      return false;
    }

}
