export interface IProfile {
    nickname: string;
}

class Profile implements IProfile {

    public nickname: string;

    constructor(nameOrUser: string | IProfile) {
        if (typeof nameOrUser === 'string') {
            this.nickname = nameOrUser;
        } else {
            this.nickname = nameOrUser.nickname;
        }
    }
}

export default Profile;
