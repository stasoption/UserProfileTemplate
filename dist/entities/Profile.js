"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Profile {
    constructor(nameOrUser) {
        if (typeof nameOrUser === 'string') {
            this.nickname = nameOrUser;
        }
        else {
            this.nickname = nameOrUser.nickname;
        }
        this.email = null;
    }
}
exports.default = Profile;
