import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
let apiUrl2 = 'http://localhost:3000/users';
let apiUrl = 'http://192.168.99.103:6000/';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  getusertoken: Observable<any>;
  baseUrl: string = 'http://192.168.99.103:6000/'
   base7Url: string= 'http://192.168.99.103:3001/profile'
  // baseUrl:string = 'http://localhost:3000/authenticate/'
  base2Url:string = 'http://localhost:3000/authorize/'
  base3Url:string = 'http://localhost:3000/users/' 
  base4Url:string = ' http://localhost:3000/logout'
  //base5Url:string ="http://localhost:3000/usersrandom"
  base6Url:string = 'http://localhost:3000/search?q='
  //base7Url:string = ' http://localhost:3000/profile'
  constructor(public http: Http, public storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }
  getTokenStorage(){
    return this.storage.get('jwtoken').then(val => {
      let autoken = val;
      console.log("getToken: ",autoken);
      return autoken;
    });
  }
  createAuthorizationHeader(headers: Headers){
    return this.storage.get('jwtoken').then(val => {
        let autoken = val;
        console.log("autoken: ", autoken);
        headers.append('Authorization', autoken);
        console.log("headers post :", headers.toJSON());
      });
  }

  private(){

    let headers = new Headers();
    return this.createAuthorizationHeader(headers).then(() =>{
      console.log("Entrando a hacer el get private");
      return this.http.get(this.baseUrl+"users/myProfile",{headers: headers})
      .map(res => res.json()).toPromise(); 
    });
    
  }

  getUserInfo(){
    let headers = new Headers();
    return this.createAuthorizationHeader(headers).then(() =>{
      console.log("Entrando a hacer el get user info");
      return this.http.get(this.baseUrl+"users/myProfile",{headers: headers})
      .map(res => res.json()).toPromise(); 
    });
  }

   getEventsRandom(){

    let headers = new Headers();
    return this.createAuthorizationHeader(headers).then(() =>{
      console.log("Entrando a hacer el get userrandom");
      return this.http.get(this.baseUrl+"events",{headers: headers})
      .map(res => res.json()).toPromise(); 
    });
    
  }

  random(){

    let headers = new Headers();
    return this.createAuthorizationHeader(headers).then(() =>{
      console.log("Entrando a hacer el get random");
      return new Promise(resolve => {
        this.http.get(this.base2Url,{headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
        }); 
    });
  }

 getUsersByName(nombre){

    console.log("nombre para buscar: ", nombre.name);
    let headers = new Headers();
    return this.createAuthorizationHeader(headers).then(() =>{
      console.log("Entrando a hacer el get del buscador");
      return this.http.get(this.baseUrl+"users/search?name="+nombre.name,{headers: headers})
      .map(res => res.json()).toPromise();
    });
  }



  login(data){
  	return this.http.post(this.baseUrl+"sign-in", data)
  	.map((data)=>this.extractData(data));
  }

  Signup(data){
    return this.http.post(this.baseUrl+"users", data)
    .map(this.extractData2);
  }

  isLogged(){
  	return this.storage.get('jwtoken').then(val => {
      //console.log("value");
       console.log("Está logeado!!");
       let res = "verdadero mano";
       return res
      }).catch(err => {
        console.log(":O No está logeado!!");
        return false
    });

  }

  logout(){

   let headers = new Headers();

   return this.createAuthorizationHeader(headers).then(() =>{
     
    this.storage.get('jwtoken').then((val) => {
        console.log('El token es: ', val);
      });
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    console.log("headers");
    console.log(headers);
    this.storage.remove('jwtoken');
    this.storage.get('jwtoken').then((val) => {
        console.log('El token removido es: ', val);
      });

    return this.http.get(this.base4Url,{
      headers: headers
    }).map(res => res.json());
    });  
  }

  refreshToken(newtoken){
    console.log("Newtoken = ",newtoken);
    this.storage.remove('jwtoken');
    this.storage.set('jwtoken', newtoken).then(() => {
        console.log('Fijado el token: ', newtoken);
    });
  }

  gettingData(res: Response){
    let body = res.json();
    console.log("body getting data: ",body);
    //window.localStorage.setItem('auth_token', body.auth_token);
     //this.storage.set('name', 'Max');
   return body || {};
 }

   extractData(res: Response){
  	let body = res.json();
  	console.log("body: ",body);
    //window.localStorage.setItem('auth_token', body.auth_token);
 	  //this.storage.set('name', 'Max');
    this.storage.set('jwtoken', body.token);
    this.storage.get('jwtoken').then((val) => {
        console.log('(Extractdata) El token es: ', val);
      });
   return body || {};

 } 

 postData(credentials, type){
    
    console.log("credencialesstringify");
    console.log(JSON.stringify(credentials));
    let consulta = '{"first_name":"lina","last_name":"maria","email":"maria@unal.edu.co","age":"12","password":"123456789","password_confirmation":"123456789"}';
    let consulta2 = '{"name":"la mas salada","description":"del barrio "}';

    let headers = new Headers();
    // return this.createAuthorizationHeader(headers).then(() =>{
    console.log("Entrando a hacer el post de usuario");

    return new Promise(resolve => {
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');

      let options = new RequestOptions({headers: headers});
      let data = JSON.stringify(credentials);
      this.http.post(apiUrl+"/users",data, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
      });

  }

  private extractData2(res: Response){
    let body = res.json();
    //window.localStorage.setItem('auth_token', body.auth_token);
   return body || {};

 }

 getPlaceById(id){
    let headers = new Headers();
    return this.createAuthorizationHeader(headers).then(() =>{
      console.log("Entrando a hacer el get place by id");
      return this.http.get(this.baseUrl+'events/site/'+id,{headers: headers})
      .map(res => res.json()).toPromise(); 
    });

  }  

  getUserInf(){

    let headers = new Headers();
    let jwt = this.getTokenStorage();
    return this.createAuthorizationHeader(headers).then(() =>{
      console.log("Entrando a hacer el get en getuserinf: ");
      return this.http.get('http://localhost:3000/user_inf', {headers: headers, params: jwt })
      .map(res => res.json()).toPromise();
    });
  }

  postEvent(postParams){
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.createAuthorizationHeader(headers).then(() =>{
      // return this.createAuthorizationHeader(headers).then(() =>{
      console.log("Entrando a hacer el post de evento");

      return new Promise(resolve => {
        let options = new RequestOptions({headers: headers});
        this.http.post(apiUrl+"events",postParams, options)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
        });  
    });
  }

  getUsersEvents(){
     let headers = new Headers();
    //let jwt = this.getTokenStorage();
    return this.createAuthorizationHeader(headers).then(() =>{
      console.log("Entrando a hacer el get en getusersEvents: ");
      return this.http.get(this.baseUrl+"events/myEvents", {headers: headers})
      .map(res => res.json()).toPromise();
    });
  }

}
