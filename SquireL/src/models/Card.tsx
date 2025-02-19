export default class Card {
    id: number;
    name: string;
    image: string;
    funFact: string;
    habitat: string;
    region: string;
    size: string;
    weight: string;
    speed: string;
    food: string;
    endangered: boolean; 
    icon: string;

   constructor(id: number, name: string, image: any, funFact: string, habitat: string, region: string, size: string, weight: string, speed: string, food: string, endangered: boolean, icon : string){
    this.id= id;
    this.name= name;
    this.image= image;
    this.funFact= funFact;
    this.habitat= habitat;
    this.region= region;
    this.size= size;
    this.weight= weight;
    this.speed= speed;
    this.food= food;
    this.endangered= endangered;
    this.icon = icon;
   };
}