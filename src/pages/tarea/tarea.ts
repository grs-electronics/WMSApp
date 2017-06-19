import { NavController, NavParams,ModalController,ToastController,AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import {Vibration} from '@ionic-native/vibration';
import { Network } from '@ionic-native/network';
import { Tarea} from '../../model/tarea';
import {SolucionTarea} from '../../model/solucion-tarea';
import {ArticuloService} from '../../providers/articulo';
import {DetallePickingPage} from '../detalle-picking/detalle-picking';
import {TareaService} from '../../providers/tarea';
import { NativeAudio } from '@ionic-native/native-audio';
import {HomePage} from '../home/home';
import {OfflineService} from '../../providers/offline';
import {Serie} from '../../model/serie';
/**
 * Generated class for the Tarea page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tarea',
  templateUrl: 'tarea.html'
})
export class TareaPage{
  public codigo:string;
  public tarea:Tarea;
  public listaSolucionTarea:Array<SolucionTarea>;
  public solucionTarea:SolucionTarea;
  public mostrarDetalle:boolean=false;
  public mensajeDeError:string;
  public mostrarError:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _articuloService:ArticuloService,public modalCtrl:ModalController,public toastCtrl: ToastController, public _tareaService:TareaService,private vibration:Vibration, private nativeAudio:NativeAudio,public alertCtrl: AlertController,private network: Network,private _offlineServie:OfflineService ) {
    this.tarea=navParams.get('tarea');
    if(!this.tarea.solucionTarea)
      this.tarea.solucionTarea=new Array<SolucionTarea>();
    this.nativeAudio.preloadSimple('errorsound', 'assets/audio/notification.mp3').then((success)=>{
      this.nativeAudio.setVolumeForComplexAsset("errorsound", 0.3);
    },(err)=>{console.error(err)});
  }

  ionViewDidLoad() {
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
  onSerie(event,input){
    event.stopPropagation();
    if(event.key==='Tab' || event.key==='Enter' || event.keyCode==13){
      if(this._offlineServie.getEstado()){
        //Conexión Activa :Wifi status;
          this._articuloService.validarArticulo(this.codigo).subscribe(data=>{
              if(data.length>0){
                  for(let item in this.tarea.detalleTarea){
                      if(this.tarea.detalleTarea[item].Articulo==data[0].ItemCode){
                          this.solucionTarea=new SolucionTarea();
                          this.solucionTarea.Articulo=data[0].ItemCode;
                          this.solucionTarea.bodega=data[0].CodigoDeBodega;
                          this.solucionTarea.numeroDeSerie=data[0].NumeroDeSerie;
                          let serieExistente:boolean=false;
                          for(let i in this.tarea.solucionTarea){
                            if(this.tarea.solucionTarea[i].numeroDeSerie==data[0].NumeroDeSerie){
                              serieExistente=true;
                            }
                          }
                          if(!serieExistente){
                              this.tarea.solucionTarea.push(this.solucionTarea);
                              if(this.tarea.detalleTarea[item].Solucion!==this.tarea.detalleTarea[item].Asignado){
                                  this.tarea.detalleTarea[item].Solucion=Number(this.tarea.detalleTarea[item].Solucion)+1;
                                  this.tarea.detalleTarea[item].Pendiente=Number(this.tarea.detalleTarea[item].Pendiente)-1;
                                  this.tarea.detalleTarea[item].Entregado=Number(this.tarea.detalleTarea[item].Entregado)+1;
                                  this.tarea.documento.Entregado+1;
                              }
                          }else{
                            this.nativeAudio.play('errorsound',()=>console.log('Error Sound playing'));
                            this.vibration.vibrate([2000,1000,2000]);
                            this.mostrarError=true;
                            this.mensajeDeError="El número de seríe ya fue ingresado.";
                            setTimeout(()=>this.mostrarError=false,5000);
                          }
                      }
                  }
              }else{
                //En caso de código no encontrado
                this.vibration.vibrate([2000,1000,2000]);
                this.mostrarError=true;
                this.mensajeDeError="El número de seríe ingresado, no coincide con los articulos de la tarea.";
                this.nativeAudio.play('errorsound',()=>console.log('Error Sound playing'));
                setTimeout(()=>this.mostrarError=false,5000);
              }
          });
      }else{
        //Modo Offline Activo:Wifi Desconectado
        let serie:Serie=this._offlineServie.busquedaSerie(this.codigo);
        if(serie!==undefined){
          for(let item in this.tarea.detalleTarea){
              if(this.tarea.detalleTarea[item].Articulo==serie.ItemCode){
                  this.solucionTarea=new SolucionTarea();
                  this.solucionTarea.Articulo=serie.ItemCode;
                  this.solucionTarea.bodega=serie.CodigoDeBodega;
                  this.solucionTarea.numeroDeSerie=serie.NumeroDeSerie;
                  let serieExistente:boolean=false;
                  for(let i in this.tarea.solucionTarea){
                    if(this.tarea.solucionTarea[i].numeroDeSerie==serie.NumeroDeSerie){
                      serieExistente=true;
                    }
                  }
                  if(!serieExistente){
                      this.tarea.solucionTarea.push(this.solucionTarea);
                      if(this.tarea.detalleTarea[item].Solucion!==this.tarea.detalleTarea[item].Asignado){
                          this.tarea.detalleTarea[item].Solucion=Number(this.tarea.detalleTarea[item].Solucion)+1;
                          this.tarea.detalleTarea[item].Pendiente=Number(this.tarea.detalleTarea[item].Pendiente)-1;
                          this.tarea.detalleTarea[item].Entregado=Number(this.tarea.detalleTarea[item].Entregado)+1;
                          this.tarea.documento.Entregado+1;
                      }
                  }else{
                    this.nativeAudio.play('errorsound',()=>console.log('Error Sound playing'));
                    this.vibration.vibrate([2000,1000,2000]);
                    this.mostrarError=true;
                    this.mensajeDeError="El número de seríe ya fue ingresado.";
                    setTimeout(()=>this.mostrarError=false,5000);
                  }
              }
          }
        }else{
          //En caso de código no encontrado
          this.vibration.vibrate([2000,1000,2000]);
          this.mostrarError=true;
          this.mensajeDeError="El número de seríe ingresado, no coincide con los articulos de la tarea.";
          this.nativeAudio.play('errorsound',()=>console.log('Error Sound playing'));
          setTimeout(()=>this.mostrarError=false,5000);
        }
      }
      this.codigo='';
      event.preventDefault();
    }
  }

  modalDetallePicking(item){
    let modal=this.modalCtrl.create(DetallePickingPage,{elementos:{picking:item,lista:this.tarea.solucionTarea}});
    modal.onDidDismiss(data=>{
      for(let index in this.tarea.detalleTarea){
        for(let i in data){
          if(this.tarea.detalleTarea[index].Articulo===data[i].Articulo){
            this.tarea.detalleTarea[index].Pendiente=Number(this.tarea.detalleTarea[index].Pendiente)+1;
            this.tarea.detalleTarea[index].Solucion=Number(this.tarea.detalleTarea[index].Solucion)-1;
            this.tarea.detalleTarea[index].Entregado=Number(this.tarea.detalleTarea[index].Entregado)-1;
          }
        }
      }
    });
    modal.present();
  }

  finalizarTarea(){
    let confirm = this.alertCtrl.create({
      title: '¿Finalizar entrega?',
      message: '¿Está seguro que desea finalizar la entrega?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.tarea.estado='Finalizada';
            this.tarea.fechaFinalizacion='' + new Date().toLocaleString();
            this._tareaService.actualizarEntregas(this.tarea).subscribe(data=>{});
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
