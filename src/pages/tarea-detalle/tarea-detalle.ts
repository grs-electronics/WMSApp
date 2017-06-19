import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {Tarea} from '../../model/tarea';

/**
 * Generated class for the TareaDetalle page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tarea-detalle',
  templateUrl: 'tarea-detalle.html',
})
export class TareaDetallePage {
  public detalleTarea:Tarea;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public  viewCtrl: ViewController) {
        this.detalleTarea=navParams.get('_tarea');
        console.log('detalle tarea');
        console.log(this.detalleTarea);
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

}
