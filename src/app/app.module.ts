import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard} from '@ionic-native/Keyboard';
import {Vibration} from '@ionic-native/vibration';
import { NativeAudio} from '@ionic-native/native-audio';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
//Se importa: para que funcione dentro del provider <<Http>>
import { HttpModule } from '@angular/http';

//Directives
import {FocusDirective} from '../components/focus/focus'

//Pages - Components
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {TareaPage} from '../pages/tarea/tarea';
import {TareaDetallePage} from '../pages/tarea-detalle/tarea-detalle';
import {DetallePickingPage} from '../pages/detalle-picking/detalle-picking';
//Services - Providers
import {AuthService} from '../providers/auth';
import {TareaService} from '../providers/tarea';
import {ArticuloService} from '../providers/articulo';
import {OfflineService} from '../providers/offline';
//Pipes
import {AgruparArticulo} from '../pipes/agrupar-articulo';
import {FiltrarTarea} from '../pipes/filtrar-tarea';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TareaPage,
    TareaDetallePage,
    DetallePickingPage,
    AgruparArticulo,
    FocusDirective,
    FiltrarTarea
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    TareaPage,
    TareaDetallePage,
    DetallePickingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    Vibration,
    NativeAudio,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    TareaService,
    ArticuloService,
    OfflineService
  ]
})
export class AppModule {}
