export interface User {
    name?: string;
    email: string;
    password: string;
}
export interface SignIn extends User {}
export interface SignUp extends User {
    passwordConfirmation: string;
}

export interface FirebaseUser {
    name: string,
    email: string,
    uid: string,
    createdAt: Date,
    isOnline: boolean
}
export interface ReducerInitialState {
    name: string,
    email: string,
    authenticating: boolean,
    authenticated: boolean,
    error: null
}

export interface IAction {
    type: string,
    payload: any
}