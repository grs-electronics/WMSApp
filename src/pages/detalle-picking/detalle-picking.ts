import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import {SolucionTarea} from '../../model/solucion-tarea';

/**
 * Generated class for the DetallePicking page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-detalle-picking',
  templateUrl: 'detalle-picking.html',
})
export class DetallePickingPage {
  public elementos:any;
  public eliminarSolucion:Array<SolucionTarea>=new Array<SolucionTarea>();
  constructor(public navCtrl: NavController, public navParams: NavParams,public  viewCtrl: ViewController,public modalCtrl:ModalController) {
    this.elementos=this.navParams.get('elementos');
  }

  ionViewDidLoad() {

  }

  eliminarSerie(item:SolucionTarea){
    this.elementos.lista.splice(this.elementos.lista.indexOf(item),1);
    this.eliminarSolucion.push(item);
  }

  dismiss() {
   this.viewCtrl.dismiss(this.eliminarSolucion);
  }

}
