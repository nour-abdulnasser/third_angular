export interface AccountInfo {
    name?: string,
    email:string,
    newPassword?: string;
    password?:string,
    rePassword?:string,
    phone?:string, // we can use this interface on login and registration, so in in login case we only need email and password
}
