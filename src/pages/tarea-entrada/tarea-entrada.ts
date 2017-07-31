import { Component } from '@angular/core';
import {ModalController,NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import {Tarea} from '../../model/tarea';
import {SolucionTarea} from '../../model/solucion-tarea';
import {TareaService} from '../../providers/tarea';
import {DetallePickingPage} from '../../pages/detalle-picking/detalle-picking';
import {HomePage} from '../../pages/home/home';
/**
 * Generated class for the TareaEntrada page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'tarea-entrada',
  templateUrl: 'tarea-entrada.html',
})
export class TareaEntradaPage {
  public codigo:string;
  public tarea:Tarea;
  public listaSolucionTarea:Array<SolucionTarea>;
  public solucionTarea:SolucionTarea;
  public mostrarDetalle:boolean=false;
  public mensajeDeError:string;
  public mostrarError:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private _tareaService:TareaService,public modalCtrl:ModalController,public toastCtrl: ToastController) {
    this.tarea=navParams.get('tarea');
    if(!this.tarea.solucionTarea)
      this.tarea.solucionTarea=new Array<SolucionTarea>();
  }

  goBack(){
    this.tarea.estado='Pausada';
    this._tareaService.actualizarEntregas(this.tarea).subscribe(data=>{});
    this.navCtrl.pop();
  }

  onFocusOut(event){
    event.preventDefault();
    event.stopPropagation();
  }

  onSerie(event,input,data){
    event.stopPropagation();
    if(event.key==='Tab' || event.key==='Enter' || event.keyCode==13){
      this.solucionTarea.numeroDeSerie=input.value;
      let nueva = new SolucionTarea();
      nueva.articulo=this.solucionTarea.articulo;
      nueva.bodega=this.solucionTarea.bodega;
      nueva.linea=this.solucionTarea.linea;
      nueva.numeroDeSerie=this.solucionTarea.numeroDeSerie;
      for(let item in this.tarea.detalleTarea ){
        if(this.tarea.detalleTarea[item].articulo==nueva.articulo && this.tarea.detalleTarea[item].linea==nueva.linea && this.tarea.detalleTarea[item].solucion!=this.tarea.detalleTarea[item].cantidad){
          this.tarea.solucionTarea.push(nueva);
          this.tarea.detalleTarea[item].solucion=Number(this.tarea.detalleTarea[item].solucion)+1;
        }
      }
      this.codigo="";
    }
  }
  modalDetallePicking(item){
    let modal= this.modalCtrl.create(DetallePickingPage,{elementos:{picking:item,lista:this.tarea.solucionTarea}});
    modal.present();
    modal.onDidDismiss((data:SolucionTarea)=>{
      for(let index in this.tarea.detalleTarea){
        for(let i in data){
          if(this.tarea.detalleTarea[index].articulo===data[i].articulo && this.tarea.detalleTarea[index].linea ==data[i].linea){
            this.tarea.detalleTarea[index].solucion=Number(this.tarea.detalleTarea[index].solucion)-1;
          }
        }
      }
    });
  }

  finalizarTarea(){
    let confirm = this.alertCtrl.create({
      title: '¿Finalizar entreda?',
      message: '¿Está seguro que desea finalizar la entrada de producto?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.tarea.estado='Finalizada';
            this.tarea.fechaFinalizacion='' + new Date().toLocaleString();
            this._tareaService.actualizarEntregas(this.tarea).subscribe(data=>{});
            this._tareaService.finalizarTarea(this.tarea).subscribe(notify=>{
              console.log(notify);
            });
            this.toastCtrl.create({
              message: 'Entrega Enviada Correctamente!! ',
              duration: 3000,
              position: 'bottom'
            }).present();
            this.navCtrl.setRoot(HomePage);
          }
        },
        {
          text: 'Cancelar',
          handler: () => {

          }
        }
      ]
    });
    confirm.present();

  }
}
