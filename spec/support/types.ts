import { Response } from 'supertest';
import { IProfile } from '@entities/Profile';


export interface IResponse extends Response {
    body: {
        profiles: IProfile[];
        error: string;
    };
}

export interface IReqBody {
    profile?: IProfile;
}
