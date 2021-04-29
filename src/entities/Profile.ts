export interface IProfile {
    nickname: string;
    email: string | null;
    avatarUrl: string | null;
    profileCreatedAt: number;
}

class Profile implements IProfile {

    public nickname: string;
    public email: string | null = null;
    public avatarUrl: string | null = null;
    public profileCreatedAt: number;

    constructor(nameOrUser: string | IProfile) {
        if (typeof nameOrUser === 'string') {
            this.nickname = nameOrUser;
        } else {
            this.nickname = nameOrUser.nickname;
        }
        this.profileCreatedAt = Date.now()
    }
}

export default Profile;
