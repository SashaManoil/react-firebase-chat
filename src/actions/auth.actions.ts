import { Dispatch } from "react";
import { auth, firestore } from "../firebaseSetup";
import { User } from "../interfaces";
import { authConstants } from "./constants";

export const signUp = (user: User) => {
    return async (dispatch: Dispatch<any>) => {
        const db = firestore();

        dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });

        auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((authRes) => {
                const currentUser = auth().currentUser;

                currentUser?.updateProfile({
                    displayName: user.name,
                })
                .then(() => {
                    db.collection("users")
                        .doc(authRes.user?.uid)
                        .set({
                            name: user?.name,
                            email: user?.email,
                            uid: authRes.user?.uid,
                            createdAt: new Date(),
                            isOnline: true
                        })
                        .then(() => {
                            const loggedUser = {
                                name: user.name,
                                email: user.email,
                                uid: authRes.user?.uid,
                            };
                            localStorage.setItem(
                                "user",
                                JSON.stringify(loggedUser)
                            );
    
                            dispatch({
                                type: `${authConstants.USER_LOGIN}_SUCCESS`,
                                payload: { user: loggedUser },
                            });
                        });
                })
            })
            .catch((error) => {
                dispatch({
                    type: `${authConstants.USER_LOGIN}_FAILURE`,
                    payload: { error },
                });
            });
    };
};

export const signIn = (email: string, password: string) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });

        auth()
            .signInWithEmailAndPassword(email, password)
            .then((authRes) => {
                const loggedUser = {
                    name: authRes.user?.displayName,
                    email: authRes.user?.email,
                    uid: authRes.user?.uid,
                };
                localStorage.setItem("user", JSON.stringify(loggedUser));

                dispatch({
                    type: `${authConstants.USER_LOGIN}_SUCCESS`,
                    payload: { user: loggedUser },
                });

                const db = firestore();
                db.collection("users")
                    .doc(authRes.user?.uid)
                        .update({
                            isOnline: true,
                        })
                    })
            .catch((error) => {
                dispatch({
                    type: `${authConstants.USER_LOGIN}_FAILURE`,
                    payload: { error },
                });
            });
    };
};

export const isLoggedInUser = () => {
    return async (dispatch: Dispatch<any>) => {
        const localUser = localStorage.getItem("user");
        const user = localUser ? JSON.parse(localUser) : null;

        if(user) {
            dispatch({
                type: `${authConstants.USER_LOGIN}_SUCCESS`,
                payload: { user },
            });
        } else {
            dispatch({
                type: `${authConstants.USER_LOGIN}_FAILURE`,
                payload: { error: "Login again please" },
            });
        }
    }
}


export const logout = (uid: string) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch({ type: `${authConstants.USER_LOGOUT}_REQUEST` });

        const db = firestore();
        db.collection("users")
            .doc(uid)
            .update({
                isOnline: false,
            })
            .then(() => {
                auth()
                    .signOut()
                    .then(() => {
                        localStorage.removeItem("user");
                        dispatch({
                            type: `${authConstants.USER_LOGOUT}_SUCCESS`,
                        });
                    })
                    .catch((error) => {
                        dispatch({
                            type: `${authConstants.USER_LOGOUT}_FAILURE`,
                            payload: error,
                        });

                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
        
    };
};