"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateErrorStatus = exports.GetErrorStatus = exports.CreateStatus = void 0;
var CreateStatus;
(function (CreateStatus) {
    CreateStatus[CreateStatus["SUCCESS"] = 0] = "SUCCESS";
    CreateStatus[CreateStatus["EXISTS"] = 1] = "EXISTS";
    CreateStatus[CreateStatus["FAIL"] = 2] = "FAIL";
    CreateStatus[CreateStatus["UNKNOWN"] = 3] = "UNKNOWN";
})(CreateStatus = exports.CreateStatus || (exports.CreateStatus = {}));
var GetErrorStatus;
(function (GetErrorStatus) {
    GetErrorStatus[GetErrorStatus["NOT_FOUND"] = 0] = "NOT_FOUND";
    GetErrorStatus[GetErrorStatus["FAIL"] = 1] = "FAIL";
    GetErrorStatus[GetErrorStatus["UNKNOWN"] = 2] = "UNKNOWN";
})(GetErrorStatus = exports.GetErrorStatus || (exports.GetErrorStatus = {}));
var UpdateErrorStatus;
(function (UpdateErrorStatus) {
    UpdateErrorStatus[UpdateErrorStatus["NOT_FOUND"] = 0] = "NOT_FOUND";
    UpdateErrorStatus[UpdateErrorStatus["FAIL"] = 1] = "FAIL";
    UpdateErrorStatus[UpdateErrorStatus["UNKNOWN"] = 2] = "UNKNOWN";
})(UpdateErrorStatus = exports.UpdateErrorStatus || (exports.UpdateErrorStatus = {}));
const dbName = 'mongodb';
const collectionName = 'profiles';
const MongoClient = require(dbName).MongoClient;
const url = "mongodb+srv://stas:qwerty12345678@devprofilecluster.qc5ep.mongodb.net/Players?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
class ProfileDao {
    create(profile, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const database = yield client.connect();
            var createStatus = CreateStatus.UNKNOWN;
            try {
                const dataBase = database.db(dbName);
                const collection = dataBase === null || dataBase === void 0 ? void 0 : dataBase.collection(collectionName);
                const nickname = profile.nickname;
                const existedProfile = yield (collection === null || collection === void 0 ? void 0 : collection.findOne({ nickname }));
                if (existedProfile != null) {
                    createStatus = CreateStatus.EXISTS;
                }
                else {
                    yield collection.save(profile);
                    createStatus = CreateStatus.SUCCESS;
                }
                console.log("createStatus:", createStatus);
            }
            catch (err) {
                console.log(err);
                createStatus = CreateStatus.FAIL;
            }
            finally {
                // await client.close()
                callback(createStatus);
            }
        });
    }
    get(nickname, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const database = yield client.connect();
            try {
                const dataBase = database.db(dbName);
                const collection = dataBase === null || dataBase === void 0 ? void 0 : dataBase.collection(collectionName);
                const profile = yield (collection === null || collection === void 0 ? void 0 : collection.findOne({ nickname }));
                if (profile == null) {
                    callback(GetErrorStatus.NOT_FOUND);
                }
                else {
                    callback(profile);
                }
            }
            catch (err) {
                console.log(err);
                callback(GetErrorStatus.FAIL);
            }
            finally {
                // client.close()
            }
        });
    }
    update(profile, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const database = yield client.connect();
            try {
                const dataBase = database.db(dbName);
                const collection = dataBase === null || dataBase === void 0 ? void 0 : dataBase.collection(collectionName);
                const nickname = profile.nickname;
                const existedProfile = yield (collection === null || collection === void 0 ? void 0 : collection.findOne({ nickname }));
                console.log("existedProfile:", existedProfile);
                if (existedProfile == null) {
                    callback(UpdateErrorStatus.NOT_FOUND);
                }
                else {
                    yield (collection === null || collection === void 0 ? void 0 : collection.replaceOne({ nickname }, profile));
                    callback(profile);
                }
            }
            catch (err) {
                console.log(err);
                callback(UpdateErrorStatus.FAIL);
            }
            finally {
                // client.close()
            }
        });
    }
}
exports.default = ProfileDao;
