/**
 * Created by retana on 26/05/2017.
 */
export class TipoDocumento{
  Asignado?:string;
  Bodega?:string;
  nombre:string;
  Entrega?:string;
  CardName?:string;
  DocStatus?:string;
  Canceled?:string;
  DocNum?:string;
  DocEntry?:string;
  Entregado?:string;
  constructor(nombre:string){this.nombre=nombre;}
}
