import { ErrorDetails } from "./model/error-details";

export class Alert {
    id: string = '';
    autoClose: boolean = false;
    keepAfterRouteChange: boolean = false;
    fade: boolean = false;
    error: ErrorDetails = new ErrorDetails('', '', []);

    constructor(init?: Partial<Alert>) {
        Object.assign(this, init);
    }
}