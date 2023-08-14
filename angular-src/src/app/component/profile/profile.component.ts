import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable, of, Subject} from 'rxjs';
import { Router } from '@angular/router';
import { UserProfile } from './user-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  @Input() user: UserProfile = {
  };
  //user: any = {};
  //"user":Object = {};
  //"user": UserProfile;

  constructor(private authService:AuthService,
    private router:Router){}

  /* ngOnInit(){
    debugger
    this.authService.getProfile()
    .subscribe({
      next: (profile) => this.user = profile.user as UserProfile,
      error: (err) => console.error(err),
      complete: () => console.info('complete')
  });
 } */

 async ngOnInit() {
  (await this.authService.getProfile()).subscribe((profile: UserProfile) => {
    this.user = profile;
  },
   err => {
     console.log(err);
     return false;
   });
}


  /* ngOnInit() {
    this.authService.getProfile().subscribe((profile)=>{
      debugger
      console.log(profile.user);
      this.user = profile.user;
      console.log(this.user);
    }); */
    /* this.authService.getProfile().subscribe((profile:any) => {
      this.user = profile.user;
    } */
}
