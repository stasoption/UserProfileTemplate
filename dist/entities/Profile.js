"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Profile {
    constructor(nameOrUser) {
        this.email = null;
        this.avatarUrl = null;
        this.titles = null;
        if (typeof nameOrUser === 'string') {
            this.nickname = nameOrUser;
        }
        else {
            this.nickname = nameOrUser.nickname;
        }
        this.profileCreatedAt = Date.now();
    }
}
exports.default = Profile;
