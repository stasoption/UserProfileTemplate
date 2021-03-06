import { IProfile } from '@entities/Profile';

export interface IProfileDao {
    create(profile: IProfile, done: (createStatus: CreateStatus) => void): void;
    get(nickname: string, done: (profile: IProfile | GetErrorStatus) => void): void;
    update(profile: IProfile, done: (profile: IProfile | UpdateErrorStatus) => void): void;
}

export enum CreateStatus {
    SUCCESS, EXISTS, FAIL, UNKNOWN
}

export enum GetErrorStatus {
    NOT_FOUND, FAIL, UNKNOWN
}

export enum UpdateErrorStatus {
    NOT_FOUND, FAIL, UNKNOWN
}

const dbName = 'mongodb';
const collectionName = 'profiles';
const MongoClient = require(dbName).MongoClient;
const url = "mongodb+srv://stas:qwerty12345678@devprofilecluster.qc5ep.mongodb.net/Players?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

class ProfileDao implements IProfileDao {
    
    public async create(profile: IProfile, callback: (createStatus: CreateStatus) => void) {
        const database = await client.connect(); 
        var createStatus = CreateStatus.UNKNOWN
        try {
            const dataBase = database.db(dbName);
            const collection = dataBase?.collection(collectionName);
            const nickname = profile.nickname
            const existedProfile = await collection?.findOne({ nickname })
            if (existedProfile != null) {
                createStatus = CreateStatus.EXISTS
            } else {
                await collection.save(profile)
                createStatus = CreateStatus.SUCCESS
            }
            console.log("createStatus:", createStatus);
        } catch(err) {
            console.log(err);
            createStatus = CreateStatus.FAIL
        } finally {
            // await client.close()
            callback(createStatus)
        }
    }

    public async get(nickname: string, callback: (profile: IProfile | GetErrorStatus) => void) {
        const database = await client.connect(); 
        try {
            const dataBase = database.db(dbName);
            const collection = dataBase?.collection(collectionName);
            const profile = await collection?.findOne({ nickname })            
            if (profile == null) {
                callback(GetErrorStatus.NOT_FOUND)
            } else {
                callback(profile)
            }
        } catch(err) {
            console.log(err);
            callback(GetErrorStatus.FAIL)
        } finally {
            // client.close()
        } 
   }

    public async update(profile: IProfile, callback: (profile: IProfile | UpdateErrorStatus) => void) {
        const database = await client.connect(); 
        try {
            const dataBase = database.db(dbName);
            const collection = dataBase?.collection(collectionName);
            const nickname = profile.nickname
            const existedProfile = await collection?.findOne({ nickname })   
            console.log("existedProfile:", existedProfile);
                     
            if (existedProfile == null) {
                callback(UpdateErrorStatus.NOT_FOUND)
            } else {
                await collection?.replaceOne({ nickname }, profile)
                callback(profile)
            }     
        } catch(err) {
            console.log(err);
            callback(UpdateErrorStatus.FAIL)
        } finally {
            // client.close()
        } 
     }
}

export default ProfileDao;
