import { Component,ViewChild} from '@angular/core';
import {Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import {LoginPage} from '../pages/login/login';
import {HomePage} from '../pages/home/home';
import {AuthService} from '../providers/auth';
import { AlertController } from 'ionic-angular';
import {OfflineService} from '../providers/offline';
import {ConfiguracionPage} from '../pages/configuracion/configuracion';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  paginas:Array<{titulo:string,component:any,icon:any}>;
  constructor(public platform: Platform,public statusBar: StatusBar, public splashScreen: SplashScreen, public _auth:AuthService,private network: Network,public alertCtrl: AlertController,private _offline:OfflineService) {
    this.initializeApp();
    this.paginas=[
      {titulo:'Home',component:HomePage,icon:'home'},
      {titulo:'Configuración',component:ConfiguracionPage,icon:'cog'}
    ];
  }

  initializeApp() {
     this.platform.ready().then(() => {
       // Okay, so the platform is ready and our plugins are available.
       // Here you can do any higher level native things you might need.
       this.statusBar.styleDefault();
       this.splashScreen.hide();

     });
     this.network.onDisconnect().subscribe(() => {
       this._offline.setEstado(false);
        this.alertCtrl.create({
           title: 'Conexión de Red Interrumpida!',
           subTitle: '¡No se detecto conexión a la red, modo offline activo!',
           buttons: ['OK']
         }).present();
      });
      this.network.onConnect().subscribe(() => {
          setTimeout(() => {
            if (this.network.type === 'wifi') {
              this._offline.setEstado(true);
            }else{
              this.alertCtrl.create({
                 title: 'Verificar Conexión de Red!',
                 subTitle: '¡Por favor verifique que este conectado mediante el modulo de wifi!',
                 buttons: ['OK']
               }).present();
            }
          }, 3000);
        });
   }
   abrirPagina(pagina){
     this.nav.setRoot(pagina.component);
   }
}
