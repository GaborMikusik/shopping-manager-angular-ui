export class ErrorDetails {
    private message: string;
    private status: string;
    private errors: string[];

    constructor(message: string, status: string, errors: string[]) {
        this.message = message;
        this.status = status;
        this.errors = errors;
    }

    getMessage(): string {
        return this.message;
    }

    getStatus(): string {
        return this.status;
    }

    getErrors(): string[] {
        return this.errors;
    }
}
