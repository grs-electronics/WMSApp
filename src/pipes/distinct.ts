import { Pipe, PipeTransform } from '@angular/core';
import {Tarea} from '../model/tarea';
/**
 * Generated class for the Distinct pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'distinct',
})
export class DistinctPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
   public tmp:Array<any>;
   transform(lista:Array<Tarea>,campo:string,campo2?:string):Array<any> {
      this.tmp=new Array<any>();
      this.tmp.length = 0;
      let arr =lista.filter((tarea)=>new RegExp(campo).test(tarea.transporte.nombre));
      this.tmp.push(...arr);
      return this.tmp;
  }
}
