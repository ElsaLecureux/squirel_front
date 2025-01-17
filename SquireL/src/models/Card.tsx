export default class Card {
    id: number;
    name: string;
    image: string;
   endangered: boolean; 

   constructor(id: number, name: string, image: string, endangered: boolean){
    this.id= id;
    this.name= name;
    this.image= image;
    this.endangered= endangered;
   };
}