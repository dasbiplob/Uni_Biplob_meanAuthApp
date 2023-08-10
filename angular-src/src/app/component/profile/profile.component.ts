import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable, of, Subject} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: any={};

  constructor(private authService:AuthService,
    private router:Router){}

/*   ngOnInit(){
    debugger
    this.authService.getProfile()
    .subscribe({
      next: (profile) => this.user = profile
      /* error: (err) => console.error(err),
      complete: () => console.info('complete')  */
//   });
// }

  ngOnInit() {
    of(this.authService.getProfile().subscribe((profile)=>{
      this.user = profile.user;
    }));
    /* this.authService.getProfile().subscribe((profile:any) => {
      this.user = profile.user;
    } */
  }


}
