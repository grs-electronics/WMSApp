export class Function{
  private static tmp:Array<any>;
  public static distinct(items:Array<any>):Array<any>{
    this.tmp = new Array<any>();
    for(let i in items){
      if(this.tmp.length<=0)
        this.tmp[i]=items[0];
      for(let ii in this.tmp){
        if(items[i].transporte.nombre!==this.tmp[ii].transporte.nombre){
          this.tmp.push(items[i]);
        }
      }
    }
    return this.tmp;
  }
}
