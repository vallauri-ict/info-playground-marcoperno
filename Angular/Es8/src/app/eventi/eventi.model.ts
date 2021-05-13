export class EventiModel {
    public _id: String;
    public name: String;
    public date: Date;
    public hourStart: Number;
    public minuteStart: Number;
    public hourFinish: Number;
    public minuteFinish: Number;
    public color: String;
    public type: String;
    public done: Number;//serve per vedere se la data è gia avvenuta
    constructor(_id:String, name:String, date:Date, hourStart:Number, hourFinish: Number, minuteStart: Number, minuteFinish: Number, type:String, color:String) {
      this._id = _id;
      this.name = name;
      this.date = date;
      this.hourStart = hourStart;
      this.minuteStart = minuteStart;
      this.hourFinish= hourFinish;
      this.minuteFinish = minuteFinish;
      this.color = color;
      this.type = type;
      var today = new Date() 
      if(date > today) {
        this.done = 0;
      }
      else {
        this.done = 1;
      }
    }
  }