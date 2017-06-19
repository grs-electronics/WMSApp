import {TipoDocumento} from "./tipo-documento";
export class Entrega extends TipoDocumento{
  DocEntry:string;
  DocNum:string;
  DocStatus:string;
  Canceled:string;
  CardName:string;
  Entrega:string;
  constructor(){
    super('Entrega');
  }
}
