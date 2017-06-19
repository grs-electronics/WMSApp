import { Pipe, PipeTransform } from '@angular/core';
import {Tarea} from '../model/tarea';
/**
 * Generated class for the FiltrarTarea pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'Tareasearch',
})
export class FiltrarTarea implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(lista:Array<Tarea>, filtro:string):Array<Tarea> {
    let listaCoincidencias:Array<Tarea>=new Array<Tarea>();
    if(!filtro){
      return lista;
    }
    lista.forEach(function(tarea){
      if(tarea.documento.DocNum.toString().match(new RegExp(filtro,'i'))  ||  tarea.tipo.toString().match(new RegExp(filtro,'i'))){
        listaCoincidencias.push(tarea);
      }
    });
    return listaCoincidencias;
  }
}
