import { Injectable } from '@angular/core';

export class ValidateService {

  constructor() { }

  validateRegister(user: { name: any; username: any; email: any; password: any; }){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateEmail(email: any){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);  
  }
}
