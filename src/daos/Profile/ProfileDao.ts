import Profile, { IProfile } from '@entities/Profile';

export interface IProfileDao {
    create: (profile: IProfile) => Promise<void>;
    get: (nickname: string) => Promise<IProfile | null>;
    update: (profile: IProfile) => Promise<void>;
}

var dataBase: { collection: (arg0: string) => any; } | null = null
const dbName = 'mongodb';
const collectionName = 'profiles';
const MongoClient = require(dbName).MongoClient;
const assert = require('assert');
const url = "mongodb+srv://stas:qwerty12345678@devprofilecluster.qc5ep.mongodb.net/Players?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(() => {
    dataBase = client.db(dbName);
});


class ProfileDao implements IProfileDao {
    
    /**
     *
     * @param profile
     */
    public async create(profile: IProfile): Promise<void> {
            const collection = dataBase?.collection(collectionName);
            return collection?.insertMany([{ profile }], function(err: string) {
                assert.equal(err, null);
                console.log(err)
            });
    }

     /**
     *
     * @param nickname
     */
      public async get(nickname: string): Promise<IProfile | null> {
        const collection = dataBase?.collection(collectionName);
        const details =  { profile: { 'nickname': nickname } }
        const profile = collection?.findOne(details)
        console.log(profile);
        return profile
 
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
