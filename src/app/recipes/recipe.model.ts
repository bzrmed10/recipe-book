import { Ingredient } from '../shared/ingredient.model';
export class Recipe {
    public name: string ;
    public description: string;
    public imagePath: string;
    public ingredients : Ingredient[]

    constructor(name: string ,desc: string , imagePth: string,ingredient : Ingredient[]){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePth;
        this.ingredients = ingredient;
    }
}