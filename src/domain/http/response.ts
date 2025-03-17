export interface ResponseDTO {
    ok: boolean,
    status: number,
    msg: string,
    body: {
        data: any
    }
}