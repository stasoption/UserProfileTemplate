import { IProfile } from "@entities/Profile";
import { ILoginData } from "@entities/LoginData";

declare module 'express' {
    export interface Request  {
        body: {
            profile: IProfile
            loginData: ILoginData
        };
    }
}
