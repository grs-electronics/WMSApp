import { Injectable } from '@angular/core';
import {Serie} from '../model/serie';
/*
  Generated class for the Offline provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OfflineService {
  private estado:boolean=true;
  constructor() {
  }
  public setEstado(estatus:boolean):void{
    this.estado=estatus;
  }
  public getEstado():boolean{
    return this.estado;
  }
  public busquedaSerie(serie:string){
    let series:Array<Serie>=JSON.parse(window.localStorage.getItem('series'));
    return series.find((item)=>this.validarSerie(item,serie));
  }
  public validarSerie(item:Serie,serie:string){
    return item.NumeroDeSerie===serie;
  }
}
