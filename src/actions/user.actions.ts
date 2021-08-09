import { Dispatch } from "react";
import { userContants } from "./constants";
import { firestore } from "../firebaseSetup";

export const getRealtimeUsers = (uid: string) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch({ type: `${userContants.GET_REALTIME_USER}_REQUEST` });

        const db = firestore();
        db.collection("users").onSnapshot((querySnapshot) => {
            const users: any = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().uid !== uid) {
                    users.push(doc.data());
                }
            });

            dispatch({
                type: `${userContants.GET_REALTIME_USER}_SUCCESS`,
                payload: { users },
            });
        });
    };
};

export const updateMessage = (messageObj: any) => {
    return async (dispatch: Dispatch<any>) => {
        const db = firestore();
        db.collection("conversations").add({
            ...messageObj,
            isView: false,
            createdAt: new Date(),
        });
    };
};

export const getRealtimeConversations =
    (user: any) => (dispatch: Dispatch<any>) => {
        const db = firestore();
        const unsubscribe = db
            .collection("conversations")
            .where("user_uid_1", "in", [user.uid_1, user.uid_2])
            .onSnapshot((querySnapshot) => {
                console.log(`ME => ${user.uid_1}, TO => ${user.uid_2}`);

                const conversations: any = [];
                querySnapshot.forEach((doc) => {
                    if (
                        (doc.data().user_uid_1 == user.uid_1 &&
                            doc.data().user_uid_2 == user.uid_2) ||
                        (doc.data().user_uid_2 == user.uid_1 &&
                            doc.data().user_uid_2 == user.uid_1)
                    ) {
                        conversations.push(doc.data());
                    }
                });

                dispatch({
                    type: `${userContants.GET_REALTIME_MESSAGES}`,
                    payload: { conversations },
                });
            });
        return unsubscribe;
    };

// export const getRealtimeConversations = (user: any) => {
//     return async (dispatch: Dispatch<any>) => {
//         const db = firestore();
//         const unsub = db
//             .collection("conversations")
//             .where("user_uid_1", "in", [user.uid_1, user.uid_2])
//             .orderBy("createdAt", "asc")
//             .onSnapshot((querySnapshot) => {
//                 console.log(`ME => ${user.uid_1}, TO => ${user.uid_2}`);

//                 const conversations: any = [];
//                 querySnapshot.forEach((doc) => {
//                     if (
//                         (doc.data().user_uid_1 == user.uid_1 &&
//                             doc.data().user_uid_2 == user.uid_2) ||
//                         (doc.data().user_uid_2 == user.uid_1 &&
//                             doc.data().user_uid_2 == user.uid_1)
//                     ) {
//                         conversations.push(doc.data());
//                     }
//                 });

//                 dispatch({
//                     type: `${userContants.GET_REALTIME_MESSAGES}`,
//                     payload: { conversations },
//                 });
//             });

//         // console.log(unsub());
//     };
// };
