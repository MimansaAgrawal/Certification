export class AuthCheck {
    userId: string;
    sessionToken: string;
    screenId: string;
    constructor(input) {
        const res: AuthCheck = {
            userId: input._id ? input._id : '',
            sessionToken: input.sessionToken ? input.sessionToken : '',
            screenId: input.screenId ? input.screenId : '',
        }
        return res;
    }
}