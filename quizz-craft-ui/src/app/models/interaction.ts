export interface Interaction{
    interaction_id?:number;
    conversation_id?: string;
    id?:string;
    created_at?:Date;
    sender:string;
    message: string;
}