export interface ILoginData {
    nickname: string
}
class LoginData implements ILoginData {
    public nickname: string;
    constructor(nameOrUser: string | ILoginData) {
        if (typeof nameOrUser === 'string') {
            this.nickname = nameOrUser;
        } else {
            this.nickname = nameOrUser.nickname;
        }
    }
}
export default LoginData;