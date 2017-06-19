import {Component } from '@angular/core';
import {NavController,AlertController  } from 'ionic-angular';
import {AuthService} from '../../providers/auth';
import {Usuario} from '../../model/usuario';
import {HomePage} from '../../pages/home/home';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public usuario:Usuario=new Usuario();
  constructor(
      public navCtrl: NavController,
      public _auth:AuthService,
      public alertCtrl: AlertController) {
  }


  public login(){
    this._auth.login(this.usuario).then(data=>{
      if(data){
        this._auth.isAuthenticated=true;
        this.navCtrl.setRoot(HomePage);
      }
    });
  }
  ionViewCanEnter() {
    return !this._auth.isAuthenticated;
  }

  public serverPrompt(){
    this.alertCtrl.create({
      title:'Dirección de Servidor',
      message:'Por favor ingrese la dirección del servidor',
      inputs:[
        {
          name:'direccion',
          placeholder:'Ingrese dirección IP',
          value: window.localStorage.getItem('server')
        }
      ],
      buttons:[
        {
          text:'Cancelar',
          role:'cancel',
          handler: data=>{
          }
        },
        {
          text:"Guardar",
          handler:data=>{
            window.localStorage.setItem('server',data.direccion);
          }
        }
      ]
    }).present();
  }

}
