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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.get = exports.create = exports.login = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const ProfileDao_1 = __importDefault(require("@daos/Profile/ProfileDao"));
const constants_1 = require("@shared/constants");
const Profile_1 = __importDefault(require("@entities/Profile"));
const profileDao = new ProfileDao_1.default();
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
/**
 * get exists profile or create new one.
 *
 * @param req LoginData
 * @param res Profile
 * @returns
 */
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { loginData } = req.body;
        console.log(req.body);
        if (!loginData) {
            return res.status(BAD_REQUEST).json({
                error: constants_1.paramMissingError,
            });
        }
        let profile = yield profileDao.get(loginData.nickname);
        if (profile != null) {
            return res.status(OK).json({ profile });
        }
        else {
            profile = new Profile_1.default(loginData.nickname);
            yield profileDao.create(profile);
            return res.status(CREATED).json({ profile });
        }
    });
}
exports.login = login;
/**
 * create profile.
 *
 * @param req Profile
 * @param res CREATED
 * @returns
 */
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { profile } = req.body;
        console.log(req.body);
        if (!profile) {
            return res.status(BAD_REQUEST).json({
                error: constants_1.paramMissingError,
            });
        }
        let localProfile = yield profileDao.get(profile.nickname);
        if (localProfile != null) {
            return res.status(OK).json({
                error: constants_1.profileAlreadyExist,
            });
        }
        yield profileDao.create(profile);
        return res.status(CREATED).end();
    });
}
exports.create = create;
/**
 * get profile.
 *
 * @param req Profile
 * @param res Profile
 * @returns
 */
function get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nickname } = req.params;
        if (nickname.length == 0) {
            return res.status(BAD_REQUEST).json({
                error: constants_1.paramMissingError,
            });
        }
        let profile = yield profileDao.get(nickname);
        if (profile != null) {
            return res.status(OK).json({ profile });
        }
        else {
            return res.status(BAD_REQUEST).json({
                error: constants_1.profileNotFound,
            });
        }
    });
}
exports.get = get;
/**
 * Update profile.
 *
 * @param req Profile
 * @param res OK
 * @returns
 */
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { profile } = req.body;
        console.log(req.body);
        if (!profile) {
            return res.status(BAD_REQUEST).json({
                error: constants_1.paramMissingError,
            });
        }
        yield profileDao.update(profile);
        return res.status(OK).end();
    });
}
exports.update = update;
