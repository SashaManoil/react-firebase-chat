import React from 'react';
import firebase from 'firebase/app';

interface AuthContextProps {
    user: firebase.User | null,
    resetUser: () => void,
}

const defaultStateContext = {
    user: null,
    resetUser: () => null,
}
export const AuthContext = React.createContext<AuthContextProps>(defaultStateContext);



