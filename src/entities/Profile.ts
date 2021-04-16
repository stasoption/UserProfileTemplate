export interface IProfile {
    nickname: string;
    email: string;
}

class Profile implements IProfile {

    public nickname: string;
    public email: string;

    constructor(nameOrUser: string | IProfile, email?: string) {
        if (typeof nameOrUser === 'string') {
            this.nickname = nameOrUser;
            this.email = email || '';
        } else {
            this.nickname = nameOrUser.nickname;
            this.email = nameOrUser.email;
        }
    }
}

export default Profile;
