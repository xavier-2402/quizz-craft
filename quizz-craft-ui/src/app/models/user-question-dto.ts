import { QuestionUser } from "./question-user";

export interface UserQuestionDto{
    userId?: number;
    id?: string;
    username?: string;
    email?: string; 
    password?: string; 
    first_name?: string; 
    last_name?: string; 
    questions:QuestionUser[];

}