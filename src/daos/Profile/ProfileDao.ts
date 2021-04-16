import { IProfile } from '@entities/Profile';

export interface IProfileDao {
    create: (profile: IProfile) => Promise<void>;
    get: (nickname: string) => Promise<IProfile | null>;
    update: (profile: IProfile) => Promise<void>;
}

class ProfileDao implements IProfileDao {
    /**
     *
     * @param profile
     */
    public async create(profile: IProfile): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }

     /**
     *
     * @param nickname
     */
      public async get(nickname: string): Promise<IProfile | null> {
        // TODO
       return null;
   }

    /**
     *
     * @param profile
     */
    public async update(profile: IProfile): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }
}

export default ProfileDao;
