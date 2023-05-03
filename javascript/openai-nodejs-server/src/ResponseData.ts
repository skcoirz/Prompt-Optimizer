export class ResponseData {
    status!: number;
    msg!: string;

    constructor(status: number, msg: string) {
        this.status = status;
        this.msg = msg;
    }

    toJson() {
        return {
            status: this.status,
            msg: this.msg
        }
    }
}