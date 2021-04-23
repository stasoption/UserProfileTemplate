"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginData {
    constructor(nameOrUser) {
        if (typeof nameOrUser === 'string') {
            this.nickname = nameOrUser;
        }
        else {
            this.nickname = nameOrUser.nickname;
        }
    }
}
exports.default = LoginData;
