import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Articulo provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ArticuloService {

  constructor(public http: Http) {

  }
  validarArticulo(ItemCode:string){
    return this.http.get('https://'+window.localStorage.getItem('server')+'/api/articuloVerificar?articulo='+ItemCode).map((res:Response)=>res.json())
  }

  validarSKU(SKU:string){
    this.http.get('https://'+window.localStorage.getItem('server')+'/api/verificarSKU?sku='+SKU).map((res:Response)=>res.json());
  }

}
