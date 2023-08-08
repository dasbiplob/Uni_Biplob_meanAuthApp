import { Injectable } from '@angular/core';
import { Observable, of, Subject,map } from 'rxjs';
import { HttpHeaders, HttpClient,HttpClientModule} from '@angular/common/http';
//import { TokenNotExpired } from '@auth0/angular-jwt';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  private _registerUrl = "users/register"
  private _authenticateUrl = "users/authentication"
  private _usersProfile = "users/profile"
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

  getProfile(){
    let headers = new Headers();
    this.loadToken();
   console.log(headers.append('Authorization',this.authToken));
    headers.append('Content-Type','application/json');
    return this.http.get(this._usersProfile);
  }

  storeUserData(token: any, user: any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;

  }

loadToken(){
  const token = localStorage.getItem('id_token');
  this.authToken = token;
}

loggedIn(){
  return !!localStorage.getItem('id_token');
}

  logOut(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
