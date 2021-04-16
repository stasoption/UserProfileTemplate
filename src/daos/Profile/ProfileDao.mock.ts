import { IProfile } from '@entities/Profile';
import { IProfileDao } from './ProfileDao';
import MockDaoMock from '../MockDb/MockDao.mock';


class ProfileDao extends MockDaoMock implements IProfileDao {

    public async create(profile: IProfile): Promise<void> {
        const db = await super.openDb();
        db.profiles.push(profile);
        await super.saveDb(db);
    }

    public async get(nickname: string): Promise<IProfile | null> {
        const db = await super.openDb();
        for (const player of db.profiles) {
            if (player.nickname === nickname) {
                return player;
            }
        }
        return null;
    }


    public async update(profile: IProfile): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.profiles.length; i++) {
            if (db.profiles[i].nickname === profile.nickname) {
                db.profiles[i] = profile;
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('Profile not found');
    }


    public async delete(nickname: string): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.profiles.length; i++) {
            if (db.profiles[i].nickname === nickname) {
                db.profiles.splice(i, 1);
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('Profile not found');
    }
}

export default ProfileDao;
