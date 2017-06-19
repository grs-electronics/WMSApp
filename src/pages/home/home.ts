import { Component,Input, OnInit } from '@angular/core';
import { ModalController,NavController,Refresher } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../providers/auth';
import {TareaService} from '../../providers/tarea';
import {Tarea} from '../../model/tarea';
import {TareaPage} from '../tarea/tarea';
import { AlertController } from 'ionic-angular';
import {TareaDetallePage} from '../../pages/tarea-detalle/tarea-detalle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  public listarEntregas:Observable<Array<Tarea>>;
  public listaEntrada:Observable<Array<Tarea>>;
  public loading:boolean;
  public prueba:[1,2,3,4,5,6,7,8,9];
  @Input() busqueda:string="";
  public tipoTarea:string='Entrega';

  constructor(
        public navCtrl: NavController,
        public _auth:AuthService,
        public _tarea:TareaService,
        public alertCtrl: AlertController,
        public modalCtrl:ModalController
      ) {
  }

   ngOnInit() {
     this.loading=true;
     //Carga la información del usuario al inicio
     const subscription=this._auth.userInfo().subscribe(
       data=>{
         this._auth.currentUser=data;

         this._tarea.listarEntrada(this._auth.currentUser.user_id).subscribe(datos=>this.listaEntrada=datos);

         this._tarea.listarEntregas(this._auth.currentUser.user_id).subscribe(data=>this.listarEntregas=data);

         subscription.unsubscribe();

         this.loading=false;
       },()=>this.loading=false);
   }

   doRefresh(refresher:Refresher){
     const subscription=this._auth.userInfo().subscribe(
       data=>{
         //Entrega
         this._auth.currentUser=data;
         this._tarea.listarEntregas(this._auth.currentUser.user_id).subscribe(data=>this.listarEntregas=data);
         //Entrada
         this._tarea.listarEntrada(this._auth.currentUser.user_id).subscribe(data=>this.listaEntrada=data);
         subscription.unsubscribe();
         refresher.complete();
       },()=>refresher.complete());
   }

  /**
  * TODO: Puede Visualizar la pantalla <<Solo si esta autenticado>>
  * @return : boolean;
  **/
  ionViewCanEnter() {
    return this._auth.isAuthenticated;
  }

  /**
  * TODO: iniciarTareaEntrega, redirecciona a la pagina de trabajo con la tarea a atender
  * @param tarea:Tarea
  **/
  iniciarTareaEntrega(tarea:Tarea){
    this.navCtrl.push(TareaPage,{tarea:tarea});
  }

/**
  * TODO: Muestra ConfirmDialog: Antes de iniciar la tarea
  */
  confirmDialog(tarea:Tarea){
      let alert=this.alertCtrl.create({
        title: 'Inicio de Tarea de '+tarea.tipo,
        message: '¿Quiere iniciar la tarea?',
        buttons: [
          {
            text: 'Iniciar',
            handler: () => {
              tarea.fechaInicio=new Date().toLocaleString();
              tarea.estado='Iniciada';
              this.iniciarTareaEntrega(tarea);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              //console.log('Cancel clicked');
            }
          }
       ]
      });
      alert.present();
  }

  /**
  *  TODO: modalDetalleTarea: Muestra modal dialog con el detalle de la tarea a Visualizar
    @param tarea:Tarea
  */
  modalDetalleTarea(tarea:Tarea){
    let modalDetalle=this.modalCtrl.create(TareaDetallePage,{_tarea:tarea});
    modalDetalle.present();
  }
}
