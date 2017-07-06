/**
 * Created by retana on 26/05/2017.
 */
export class TipoDocumento{
  asignado?:string;
  bodega?:string;
  nombre:string;
  entrega?:string;
  cardName?:string;
  docStatus?:string;
  canceled?:string;
  docNum?:string;
  docEntry?:string;
  entregado?:string;
  constructor(nombre:string){this.nombre=nombre;}
}
