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
  public busquedaSerie(serie:string):Array<Serie>{
    let series:Array<Serie>=JSON.parse(window.localStorage.getItem('series'));
    let tmp:Array<Serie>=new Array<Serie>();
    for(let i in series){
      if(series[i].numeroDeSerie===serie){
        tmp.push(serie);
      }
    }
    //return series.find((item)=>this.validarSerie(item,serie));
    return tmp;
  }
  public validarSerie(item:Serie,serie:string){
    return item.numeroDeSerie===serie;
  }
}
