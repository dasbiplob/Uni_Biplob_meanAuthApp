import { Injectable } from '@angular/core';
import { Observable, of, Subject,map } from 'rxjs';
import { HttpHeaders, HttpClient,HttpClientModule} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  private _registerUrl = "http://localhost:3000/users/register"
  constructor(private http:HttpClient) { }

  registerUser(user: any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this._registerUrl, user);

  }
}
