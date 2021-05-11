export class EventiModel {
    public id: string;
    public nome: string;
    public ora: string;
  
    constructor(id:string, nome:string, ora:string) {
      this.id = id;
      this.nome = nome;
      this.ora = ora;
    }
  }