import Profile, { IProfile } from '@entities/Profile';

export interface IProfileDao {
    create: (profile: IProfile) => Promise<void>;
    get: (nickname: string) => Promise<IProfile | null>;
    update: (profile: IProfile) => Promise<void>;
}

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'mongodb';
const client = new MongoClient(url);

class ProfileDao implements IProfileDao {
    
    /**
     *
     * @param profile
     */
    public async create(profile: IProfile): Promise<void> {
        client.connect(function(err: string) {
            assert.equal(null, err);
            const db = client.db(dbName);
            const collection = db.collection('profiles');
            collection.insertMany([{ profile }], function(err: string) {
                assert.equal(err, null);
            });
            console.log('Inserted profile')
            client.close();
          });
        return Promise.resolve(undefined);
    }

     /**
     *
     * @param nickname
     */
      public async get(nickname: string, isNeedCloseClient: boolean = true): Promise<IProfile | null> {
        client.connect(function(err: string) {
            assert.equal(null, err);
            const db = client.db(dbName);
            const collection = db.collection('profiles');
            const details = { 'nickname' : nickname };
            collection.findOne(details, function(err: any, profile: any) {
                assert.equal(err, null);
                console.log("err:", err);
                console.log("profile:", profile);
                return profile
              });
              if (isNeedCloseClient) {
                client.close();
              }
          });
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
