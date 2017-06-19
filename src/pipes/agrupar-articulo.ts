import { Pipe, PipeTransform } from '@angular/core';
import {SolucionTarea} from '../model/solucion-tarea';
/**
 * Generated class for the AgruparArticulo pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'filtrar',
  pure: false
})
export class AgruparArticulo implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
   public tmp:Array<any>=new Array<any>();
   transform(lista:Array<SolucionTarea>,campo:string):Array<any> {
      this.tmp.length = 0;
      let arr =lista.filter((articulo)=>new RegExp(campo).test(articulo.Articulo));
      this.tmp.push(...arr);
      return this.tmp;
  }
}
