export interface LoginResponse {
    token: string;
    // user:any;
    user:{
       [key:string]:any
    };
}