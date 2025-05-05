export interface IAResponseDTO {
    id?:string,
    name?:string,
    content?:string,
    date?:string,
    summary?:string,
    img?:any[],
} 

export interface UserPetition {
    text: string;
}

export interface IAChats {
    type: 'IA' | 'User',
data: IAResponseDTO[] | UserPetition,
}