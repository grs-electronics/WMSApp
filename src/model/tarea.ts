import {Operario} from "./operario";
import {TipoDocumento} from "./tipo-documento";
import {Transporte} from "./transporte";
import {SolucionTarea} from "./solucion-tarea";
/**
 * Created by retana on 26/05/2017.
 */

export class Tarea {
  fechaAsignacion: string = '' +new Date().toLocaleString();
  fechaInicio: string;
  fechaFinalizacion: string;
  estado: string = 'No Iniciada'; //finalizada - No iniciada - pausada
  detalleTarea: Array<any>;
  documento: TipoDocumento;
  operario: Operario;
  prioridad: string = 'Media';
  comentario: string;
  tipo: string;
  duracion:string='30';
  transporte:Transporte;
  orden:string;
  solucionTarea:Array<SolucionTarea>=new Array<SolucionTarea>();
  __v:string;
  constructor(){}
}
