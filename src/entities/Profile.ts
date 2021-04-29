export interface IProfile {
    nickname: string;
    email: string | null;
}

class Profile implements IProfile {

    public nickname: string;
    public email: string | null;

    constructor(nameOrUser: string | IProfile) {
        if (typeof nameOrUser === 'string') {
            this.nickname = nameOrUser;
        } else {
            this.nickname = nameOrUser.nickname;
        }
        this.email = null
    }
}

export default Profile;
