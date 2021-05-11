export class LibriModel {
    public id: string;
    public author: string;
    public country: string;
    public pages: string;
    public title: string;
    public year: string;
  
    constructor(id:string, author:string, country:string,
         pages: string, title: string, year: string) {
      this.id = id;
      this.author = author;
      this.country = country;
      this.pages = pages;
      this.title = title;
      this.year = year;
    }
    public show():string{
      return (this.author+" "+this.country);
    }
  }