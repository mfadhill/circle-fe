import { IAuthor, IProfile } from "../../types/app";

export type IauthorState = {
    error: any;
    isAuthenticated: any;
    isLogin: boolean,
    token: string,
    profile: IAuthor
}