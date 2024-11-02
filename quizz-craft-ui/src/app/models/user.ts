export interface User{
    user_id:number;
    id?:string;
    username:string;
    email:string;
    first_name:string;
    last_name:string;
    password_hash?: string; 
}