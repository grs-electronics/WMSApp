import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import {ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Usuario} from '../model/usuario';
import {Observable} from "rxjs";

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  currentUser:Usuario;
  data:any;
  isAuthenticated: boolean = false;

  constructor(public _http: Http,private toastCtrl: ToastController) {}

  public obtenerSeries(){
      this._http.get('https://'+window.localStorage.getItem('server')+'/api/series').map((res:Response)=>res.json()).subscribe(data=>{
        window.localStorage.setItem('series',JSON.stringify(data));
      });
  }
  test(){
    let headers=new Headers();
     headers.append('Access-Control-Allow-Origin', '*');
     headers.append('Authorization','Basic Y2xpZW50X3h4OnNlY3JldF95eQ==');
     this._http.get('https://'+window.localStorage.getItem('server')+'/api/entrega',{headers:headers}).map((res:Response)=>res.json()).subscribe(inf=>this.data=inf);
     return this.data;
  }

  login(usercreds:Usuario){
    let headers = new Headers();
    let creds = `grant_type=password&username=${usercreds.username}&password=${usercreds.password}&scope=offline_access`;

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization','Basic Y2xpZW50X3h4OnNlY3JldF95eQ==');

    return new Promise((resolve) => {
        this._http.post('https://'+window.localStorage.getItem('server')+'/oauth/token', creds, {headers:
        headers}).subscribe((data) => {
            if(data) {
                window.localStorage.setItem('access_token',
                  data.json().access_token);
                window.localStorage.setItem('expires_in',
                  data.json().expires_in);
                window.localStorage.setItem('refresh_token',
                  data.json().refresh_token);
                window.localStorage.setItem('token_type',
                  data.json().token_type);
                this.isAuthenticated=true;
                this.obtenerSeries();
              }
                resolve(this.isAuthenticated);
            },
            (err)=>{
              this.toastCtrl.create({
                message: this.extractData(err).error_description,
                duration: 3000,
                position: 'bottom'
              }).present();
            }
        );
    });
  }

  userInfo(){
    let headers = new Headers();
    headers.append('Authorization','Basic Y2xpZW50X3h4OnNlY3JldF95eQ==');
    return this._http.get('https://'+window.localStorage.getItem('server')+'/api/userinfo?access_token='+window.localStorage.getItem('access_token'),{headers:headers}).map(this.extractData).catch(this.handleErrorObservable);
  }

  private extractData(res: Response) {
    let body = res.json();
  return body|| {};
  }
  private handleErrorObservable (error: Response | any) {
    return Observable.throw(error.message || error);
  }
}
