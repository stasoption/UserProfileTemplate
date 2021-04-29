import { IProfile } from '@entities/Profile';

export interface IProfileDao {
    create(profile: IProfile, done: (createStatus: CreateStatus) => void): void;
    get(nickname: string, done: (profile: IProfile | null) => void): void;
    update(profile: IProfile): void;
}

export enum CreateStatus {
    SUCCESS, EXISTS, FAIL
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
    public async create(profile: IProfile, callback: (createStatus: CreateStatus) => void) {
        client.connect(async () => {
            try {
                const dataBase = client.db(dbName);
                const collection = dataBase?.collection(collectionName);

                const details =  { profile: { 'nickname': profile.nickname } }
                const existedProfile = await collection?.findOne(details)
                if (existedProfile != null) {
                    callback(CreateStatus.EXISTS)
                } else {
                    await collection?.insertMany([{ profile }]); // insertOne
                    callback(CreateStatus.SUCCESS)
                }
            } catch(err) {
                console.log(err);
                callback(CreateStatus.FAIL)
            }
        }); 
    }

     /**
     *
     * @param nickname
     */
      public async get(nickname: string, callback: (profile: IProfile | null) => void) {
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
                callback(null)
            } 
        }); 
   }

    /**
     *
     * @param profile
     */
    public async update(profile: IProfile) { }
}

export default ProfileDao;
