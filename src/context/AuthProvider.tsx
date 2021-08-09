import { useEffect, useState, FC } from "react";
import { AuthContext } from "./AuthContext";
// import { auth } from "../firebaseSetup";
import firebase from "firebase";

const AuthProvider: FC = ({ children }) => {
    const localUser = localStorage.getItem("user");
    const parsedUser = localUser ? JSON.parse(localUser) : null;

    const [user, setUser] = useState<firebase.User | null>(parsedUser);

    const resetUser = () => setUser(null);

    useEffect(() => {
        if (user) {
            return;
        }
        // const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        //     await setUser(firebaseUser);
        //     await localStorage.setItem("user", JSON.stringify(firebaseUser));
        // });

        // return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                resetUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
