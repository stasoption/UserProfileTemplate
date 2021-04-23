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
var dataBase = null;
const dbName = 'mongodb';
const collectionName = 'profiles';
const MongoClient = require(dbName).MongoClient;
const assert = require('assert');
const url = "mongodb+srv://stas:qwerty12345678@devprofilecluster.qc5ep.mongodb.net/Players?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(() => {
    dataBase = client.db(dbName);
});
class ProfileDao {
    /**
     *
     * @param profile
     */
    create(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = dataBase === null || dataBase === void 0 ? void 0 : dataBase.collection(collectionName);
            return collection === null || collection === void 0 ? void 0 : collection.insertMany([{ profile }], function (err) {
                assert.equal(err, null);
                console.log(err);
            });
        });
    }
    /**
    *
    * @param nickname
    */
    get(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = dataBase === null || dataBase === void 0 ? void 0 : dataBase.collection(collectionName);
            const details = { profile: { 'nickname': nickname } };
            const profile = collection === null || collection === void 0 ? void 0 : collection.findOne(details);
            console.log(profile);
            return profile;
        });
    }
    /**
     *
     * @param profile
     */
    update(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO
            return Promise.resolve(undefined);
        });
    }
}
exports.default = ProfileDao;
