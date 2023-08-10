import { Injectable } from '@angular/core';
import { Observable, of, Subject} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders, HttpClient,HttpClientModule} from '@angular/common/http';
//import { TokenNotExpired } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  //For Production
  /* private _registerUrl = "users/register"
  private _authenticateUrl = "users/authentication"
  private _usersProfile = "users/profile" */

  private _registerUrl = "http://localhost:3000/users/register"
  private _authenticateUrl = "http://localhost:3000/users/authentication"
  private _usersProfile = "http://localhost:3000/users/profile"

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

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  /* getProfile():Observable<any>{
    debugger
    this.loadToken();
    let headers = new HttpHeaders()
    .set('Authorization',this.authToken)
    .set('Content-Type','application/json');
   //console.log(headers.append('Authorization',this.authToken));
    //headers.append('Authorization',this.authToken);
    //headers.append('Content-Type','application/json');
    return this.http.get(this._usersProfile,{headers: headers});
  } */

    getProfile():Observable<any> {
      let headers = new HttpHeaders();
      this.loadToken();
      headers = headers.append('Authorization', this.authToken);
      debugger
      headers = headers.append('Content-Type', 'application/json');
      return this.http.get(this._usersProfile, {headers: headers}).pipe(
        catchError((error: any) =>{
          console.log(error);
          throw 'Something went wrong';
        })
      )
        
    }

  storeUserData(token: any, user: any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;

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
