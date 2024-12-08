export interface User{
    "recipes": string[],
    "comments": string[],
    "_id": string,
    "tel": string,
    "email": string,
    "username": string,
    "password": string,
    "created_at": string,
    "updatedAt": string,
    "__v": number
}
export interface UserForAuth{
    username:string,
    email:string,
    phoneNumber:string,
    password:string,
    id:string
}