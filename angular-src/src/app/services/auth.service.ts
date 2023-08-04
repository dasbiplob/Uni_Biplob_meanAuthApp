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
  private _authenticateUrl = "http://localhost:3000/users/authentication"
  constructor(private http:HttpClient) { }

  registerUser(user: any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this._registerUrl, user);

  }

  authenticateUser(user: any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this._authenticateUrl,user);
  }

  storeUserData(token: any, user: any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;

  }

  logOut(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
