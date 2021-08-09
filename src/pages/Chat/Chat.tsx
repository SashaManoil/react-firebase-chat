import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Paper } from "@material-ui/core";
import { useStyles } from "./styles";

import { getRealtimeUsers } from "../../actions";
import { FirebaseUser } from "../../interfaces";
import { firestore } from "../../firebaseSetup";
import { userConstants } from "../../actions/constants";

import UserList from "../../components/UserList/UserList";
import UserFilter from "../../components/UserFilter/UserFilter";
import Header from "../../components/Header/Header";
import Messenger from "../../components/Messenger/Messenger";

const Chat = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const auth = useSelector((state: any) => state.auth);
    const user = useSelector((state: any) => state.user);

    const [chatStarted, setChatStarted] = useState<boolean>(false);
    const [chatUser, setChatUser] = useState<string>("");
    const [userUid, setUserUid] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    const initChat = (u: FirebaseUser) => {
        setChatStarted(true);
        setChatUser(u.name);
        setUserUid(u.uid);

        dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: u.uid }));
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const getRealtimeConversations = (user: any) => {
        const db = firestore();
        const unsubscribe = db
            .collection("conversations")
            .where("user_uid_1", "in", [user.uid_1, user.uid_2])
            .orderBy("createdAt", "asc")
            .onSnapshot((querySnapshot) => {
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
                    type: `${userConstants.GET_REALTIME_MESSAGES}`,
                    payload: { conversations },
                });
            });

        return unsubscribe;
    };

    useEffect(() => {
        if (!userUid) return;

        const unsubscribe = getRealtimeConversations({
            uid_1: auth.uid,
            uid_2: userUid,
        });

        return () => unsubscribe();
    }, [userUid]);

    useEffect(() => {
        dispatch(getRealtimeUsers(auth.uid));
    }, []);

    const filterUsers = () => {
        if (search === "") {
            return user.users;
        }

        return user.users.filter((user: FirebaseUser) =>
            user.name.toLowerCase().includes(search.toLocaleLowerCase())
        );
    };

    return (
        <Container>
            <Paper>
                <Grid container className={classes.chatContainer}>
                    <Header />
                    <Grid item xs={4} className={classes.sidebar}>
                        <>
                            <UserFilter onChange={handleSearch} />
                            <UserList
                                onClick={initChat}
                                users={filterUsers()}
                            />
                        </>
                    </Grid>
                    <Messenger
                        started={chatStarted}
                        userName={chatUser}
                        userUid={userUid}
                    />
                </Grid>
            </Paper>
        </Container>
    );
};

export default Chat;
