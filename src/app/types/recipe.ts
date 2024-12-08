import { Comment } from "./comment";
import { User } from "./user";

export interface Recipe {
        "description": string,
        "image": string,
        "subscribers": string[],
        "comments": Comment[],
        "_id": string,
        "recipeName": string,
        "userId": User,
        "created_at": string,
        "updatedAt": string,
        "__v": number

}