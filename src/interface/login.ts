export interface ILogin {
    readonly token: string,
    readonly user: IUserLogin
}

interface IUserLogin {
    readonly username: string,
    readonly name: string,
    readonly email: string,
    readonly role: string,
    readonly sub: string,
}