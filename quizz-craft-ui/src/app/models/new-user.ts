import { QuestionUser } from "./question-user";

export interface NewUser{
    username:string;
    email:string;
    password:string;
    first_name:string;
    last_name:string;
    questions:QuestionUser[];

}