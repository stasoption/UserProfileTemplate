import { IProfile } from "@entities/Profile";

declare module 'express' {
    export interface Request  {
        body: {
            profile: IProfile
        };
    }
}
