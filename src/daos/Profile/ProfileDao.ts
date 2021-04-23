import { IProfile } from '@entities/Profile';

export interface IProfileDao {
    // getObject(done: (data: any, elapsedTime?: number) => void): void;


    create(profile: IProfile, done: (isSuccess: boolean) => void): void;
    get(nickname: string, done: (profile: Promise<IProfile | null>) => void): void;
    update: (profile: IProfile) => Promise<void>;
}

const dbName = 'mongodb';
const collectionName = 'profiles';
const MongoClient = require(dbName).MongoClient;
const url = "mongodb+srv://stas:qwerty12345678@devprofilecluster.qc5ep.mongodb.net/Players?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

class ProfileDao implements IProfileDao {
    
    /**
     *
     * @param profile
     */
    public async create(profile: IProfile, callback: (isSuccess: boolean) => void) {
        client.connect(() => {
            try {
                const dataBase = client.db(dbName);
                const collection = dataBase?.collection(collectionName);
                collection?.insertMany([{ profile }]);
                callback(true)
            } catch(err) {
                console.log(err);
                callback(false)
            } 
            // finally {
            //     client.close()
            // }
        }); 
    }

     /**
     *
     * @param nickname
     */
      public async get(nickname: string, callback: (profile: Promise<IProfile | null>) => void) {
        client.connect(async () => {
            var profile = null
            try {
                const dataBase = client.db(dbName);
                const collection = dataBase?.collection(collectionName);
                const details =  { profile: { 'nickname': nickname } }
                profile = await collection?.findOne(details)
                callback(profile)
            } catch(err) {
                console.log(err);
                callback(profile)
            } 
            // finally {
            //     client.close()
            // }
        }); 
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
