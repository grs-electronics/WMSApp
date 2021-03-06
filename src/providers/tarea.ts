import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import {Tarea} from '../model/tarea';
import 'rxjs/add/operator/map';

@Injectable()
export class TareaService {

  constructor(public _http: Http) {
  }

  listarEntregas(id:string){
    return  this._http.get('https://'+window.localStorage.getItem('server')+'/api/tareaOperarioEntrega?_id='+id).map((res:Response)=>res.json());
  }

  actualizarEntregas(tarea:Tarea){
    return this._http.put('https://'+window.localStorage.getItem('server')+'/api/tarea',tarea).map((res:Response)=>res.json());
  }

  finalizarTarea(tarea:Tarea){
    if(tarea.tipo==='Entrega'){
        return this._http.post('http://192.168.10.17:8089/entrega',tarea).map((res:Response)=>res.json());
    }else if(tarea.tipo='Entrada'){
      return this._http.post('http://192.168.10.17:8089/entrada',tarea).map((res:Response)=>res.json());
    }

  }

  listarEntrada(id:string){
    return  this._http.get('https://'+window.localStorage.getItem('server')+'/api/tareaOperarioEntrada?_id='+id).map((res:Response)=>res.json());
  }
}
