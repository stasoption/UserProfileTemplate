"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.update = exports.get = exports.login = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const ProfileDao_1 = __importStar(require("@daos/Profile/ProfileDao"));
const constants_1 = require("@shared/constants");
const Profile_1 = __importDefault(require("@entities/Profile"));
const profileDao = new ProfileDao_1.default();
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { loginData } = req.body;
        console.log(req.body);
        if (!loginData) {
            return res.status(BAD_REQUEST).json({ error: constants_1.paramMissingError });
        }
        const newProfile = new Profile_1.default(loginData.nickname);
        profileDao.create(newProfile, function (createStatus) {
            switch (createStatus) {
                case ProfileDao_1.CreateStatus.EXISTS: {
                    return res.status(BAD_REQUEST).json({ error: constants_1.profileAlreadyExist });
                }
                case ProfileDao_1.CreateStatus.SUCCESS: {
                    return res.status(CREATED).json({ newProfile });
                }
                case ProfileDao_1.CreateStatus.FAIL: {
                    return res.status(BAD_REQUEST).json({ error: constants_1.errorUnexpected });
                }
                default: {
                    return res.status(BAD_REQUEST).json({ error: constants_1.errorUnexpected });
                }
            }
        });
    });
}
exports.login = login;
function get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nickname } = req.params;
        if (nickname.length == 0) {
            return res.status(BAD_REQUEST).json({ error: constants_1.paramMissingError });
        }
        profileDao.get(nickname, function (profile) {
            const iprofile = profile;
            if (iprofile) {
                return res.status(OK).json({ profile });
            }
            switch (profile) {
                case ProfileDao_1.GetErrorStatus.NOT_FOUND: {
                    return res.status(BAD_REQUEST).json({ error: constants_1.profileNotFound });
                }
                case ProfileDao_1.GetErrorStatus.FAIL: {
                    return res.status(BAD_REQUEST).json({ error: constants_1.errorUnexpected });
                }
            }
        });
    });
}
exports.get = get;
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { profile } = req.body;
        console.log(req.body);
        if (!profile) {
            return res.status(BAD_REQUEST).json({ error: constants_1.paramMissingError });
        }
        profileDao.update(profile, function (profile) {
            const iprofile = profile;
            if (iprofile) {
                return res.status(OK).json({ profile });
            }
            switch (profile) {
                case ProfileDao_1.UpdateErrorStatus.NOT_FOUND: {
                    return res.status(BAD_REQUEST).json({ error: constants_1.profileNotFound });
                }
                case ProfileDao_1.UpdateErrorStatus.FAIL: {
                    return res.status(BAD_REQUEST).json({ error: constants_1.errorUnexpected });
                }
            }
        });
    });
}
exports.update = update;
