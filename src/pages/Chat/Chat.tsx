import React, { Dispatch, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Avatar,
    Container,
    Grid,
    IconButton,
    List,
    Paper,
} from "@material-ui/core";
import { MoodRounded, SendRounded, ExitToApp } from "@material-ui/icons";
import { useStyles } from "./styles";

import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import UserItem from "../../components/UserItem/UserItem";

import {
    logout,
    getRealtimeUsers,
    updateMessage,
    // getRealtimeConversations,
} from "../../actions";
import { FirebaseUser } from "../../interfaces";
import UserMessage from "../../components/UserMessage/UserMessage";
import Picker from "emoji-picker-react";
import EmptyMessage from "../../components/EmptyMessage/EmtpyMessage";
import EmptyChat from "../../components/EmptyChat/EmptyChat";
import { firestore } from "../../firebaseSetup";
import { userContants } from "../../actions/constants";

const Chat = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const messageListRef = useRef(null);

    const auth = useSelector((state: any) => state.auth);
    const user = useSelector((state: any) => state.user);

    const [chatStarted, setChatStarted] = useState<boolean>(false);
    const [chatUser, setChatUser] = useState<string>("");
    const [userUid, setUserUid] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [emojiState, setEmojiState] = useState<boolean>(false);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };
    const handleLogout = async () => {
        dispatch(logout(auth.uid));
    };
    const handleMessage = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
            setMessage("");
        }
    };

    const showEmoji = () => {
        setEmojiState(!emojiState);
    };

    const onEmojiClick = (event: any, emojiObject: any) => {
        // setEmojiState(false);
        const emoji = emojiObject.emoji;

        setMessage((prev) => prev + emoji);
    };

    const sendMessage = () => {
        const msgObj = {
            user_uid_1: auth.uid,
            user_uid_2: userUid,
            message,
        };

        if (message !== "") {
            dispatch(updateMessage(msgObj));
            setMessage("");
        }
    };

    const initChat = (u: FirebaseUser) => {
        setChatStarted(true);
        setChatUser(u.name);
        setUserUid(u.uid);
        setMessage("");

        dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: u.uid }));
    };

    const getRealtimeConversations = (user: any) => {
        const db = firestore();
        const unsubscribe = db
            .collection("conversations")
            .where("user_uid_1", "in", [user.uid_1, user.uid_2])
            .orderBy("createdAt", "asc")
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

    useEffect(() => {
        if (!userUid) return;
        const unsubscribe = getRealtimeConversations({
            uid_1: auth.uid,
            uid_2: userUid,
        });

        return () => {
            unsubscribe();
        };
    }, [userUid]);

    useEffect(() => {
        dispatch(getRealtimeUsers(auth.uid));
    }, []);

    useEffect(() => {
        // @ts-ignore
        messageListRef.current.scrollIntoView({ block: "end" });
    }, [user.conversations]);
    return (
        <>
            <Container>
                <Paper>
                    <Grid container className={classes.chatContainer}>
                        <Grid item xs={4} className={classes.sidebar}>
                            <div className="chat-sidebar">
                                <div className="chat-sidebar__search">
                                    <Input
                                        label="Search"
                                        name="search"
                                        value={search}
                                        onChange={handleSearch}
                                        variant="outlined"
                                    ></Input>
                                </div>
                                <List className={classes.userList}>
                                    {user.users.length ? (
                                        user.users.map((user: any) => (
                                            <UserItem
                                                onClick={initChat}
                                                user={user}
                                                key={user.uid}
                                            />
                                        ))
                                    ) : (
                                        <Loader />
                                    )}
                                </List>
                            </div>
                        </Grid>
                        <Grid item xs>
                            <Grid
                                container
                                direction="column"
                                justifyContent="space-between"
                                className={classes.rightSide}
                            >
                                <Grid item xs className={classes.header}>
                                    {chatStarted && chatUser ? (
                                        <>
                                            <Avatar
                                                alt="Remy Sharp"
                                                src="/static/images/avatar/1.jpg"
                                            />
                                            <span className={classes.userName}>
                                                {chatUser}
                                            </span>
                                        </>
                                    ) : null}

                                    <IconButton
                                        aria-label="logout"
                                        className={classes.logoutButton}
                                        onClick={handleLogout}
                                    >
                                        <ExitToApp fontSize="medium" />
                                    </IconButton>
                                </Grid>
                                <Grid item xs className={classes.chat}>
                                    <div
                                        className={classes.messageList}
                                        ref={messageListRef}
                                    >
                                        {chatStarted ? (
                                            user.conversations.length > 0 ? (
                                                user.conversations.map(
                                                    (
                                                        conv: any,
                                                        index: number
                                                    ) => (
                                                        <UserMessage
                                                            key={index}
                                                            message={
                                                                conv.message
                                                            }
                                                            time={conv.createdAt.toDate()}
                                                            type={
                                                                conv.user_uid_1 ===
                                                                auth.uid
                                                                    ? "to"
                                                                    : "from"
                                                            }
                                                        />
                                                    )
                                                )
                                            ) : (
                                                <EmptyMessage />
                                            )
                                        ) : (
                                            <EmptyChat />
                                        )}
                                    </div>
                                </Grid>
                                {chatStarted && (
                                    <Grid item xs className={classes.textarea}>
                                        <textarea
                                            name="message"
                                            value={message}
                                            onKeyPress={handleMessage}
                                            onChange={(e) =>
                                                setMessage(e.target.value)
                                            }
                                            placeholder="Message"
                                        ></textarea>
                                        {emojiState && (
                                            <div
                                                onMouseLeave={() =>
                                                    setEmojiState(false)
                                                }
                                            >
                                                <Picker
                                                    onEmojiClick={onEmojiClick}
                                                    disableAutoFocus={true}
                                                    groupNames={{
                                                        smileys_people:
                                                            "PEOPLE",
                                                    }}
                                                    native
                                                />
                                            </div>
                                        )}
                                        <IconButton
                                            aria-label="logout"
                                            className={classes.emojiButton}
                                            onClick={showEmoji}
                                        >
                                            <MoodRounded fontSize="large" />
                                        </IconButton>
                                        <IconButton
                                            aria-label="logout"
                                            className={classes.sendButton}
                                            onClick={sendMessage}
                                        >
                                            <SendRounded fontSize="large" />
                                        </IconButton>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
};

export default Chat;
