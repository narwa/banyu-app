type ErrorType = 'RESPONSE_ERROR';
type Values = {
    message: string;
    type?: ErrorType;
};

export class HttpResponseError extends Error {
    type!: ErrorType;
    constructor({ message, type = 'RESPONSE_ERROR' }: Values) {
        super(message);
        this.type = type;
    }
}
