"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Profile {
    constructor(nameOrUser, email) {
        if (typeof nameOrUser === 'string') {
            this.nickname = nameOrUser;
            this.email = email || '';
        }
        else {
            this.nickname = nameOrUser.nickname;
            this.email = nameOrUser.email;
        }
    }
}
exports.default = Profile;
