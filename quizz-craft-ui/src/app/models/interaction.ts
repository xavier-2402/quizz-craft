export interface Interaction{
    interaction_id?:number;
    question?: string;
    response?: string;
    conversation_id?: string;
    sender:string;
    message: string;
}