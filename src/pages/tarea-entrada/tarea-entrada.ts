import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {Tarea} from '../../model/tarea';
import {SolucionTarea} from '../../model/solucion-tarea';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.tarea=navParams.get('tarea');
    if(!this.tarea.solucionTarea)
      this.tarea.solucionTarea=new Array<SolucionTarea>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TareaEntrada');
  }

  goBack(){

  }



}
