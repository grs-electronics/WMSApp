import {TipoDocumento} from "./tipo-documento";
export class Entrega extends TipoDocumento{
  docEntry:string;
  docNum:string;
  docStatus:string;
  canceled:string;
  cardName:string;
  entrega:string;
  constructor(){
    super('Entrega');
  }
}
