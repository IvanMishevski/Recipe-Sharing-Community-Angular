import { Recipe } from "./recipe";
import { User } from "./user";

export interface Comment{
    "likes": string[],
    "_id": string,
    "text": string,
    "userId": User,
    "recipeId": Recipe,
    "created_at": string,
    "updatedAt": string,
    "__v": number
    
}