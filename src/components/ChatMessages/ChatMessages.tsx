import React, { FC, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import EmptyMessage from "../EmptyMessage/EmtpyMessage";
import UserMessage from "../UserMessage/UserMessage";
import { useStyles } from "./styles";
import { useSelector } from "react-redux";

const ChatMessages: FC = () => {
    const classes = useStyles();
    const messageListRef = useRef(null);

    const auth = useSelector((state: any) => state.auth);
    const user = useSelector((state: any) => state.user);

    useEffect(() => {
        // @ts-ignore
        messageListRef.current.scrollIntoView({ block: "end" });
    }, [user.conversations]);

    return (
        <Grid item xs className={classes.chat}>
            <div className={classes.messageList} ref={messageListRef}>
                {user.conversations.length > 0 ? (
                    user.conversations.map((conv: any, index: number) => (
                        <UserMessage
                            key={index}
                            message={conv.message}
                            time={conv.createdAt.toDate()}
                            type={conv.user_uid_1 === auth.uid ? "to" : "from"}
                        />
                    ))
                ) : (
                    <EmptyMessage />
                )}
            </div>
        </Grid>
    );
};

export default ChatMessages;
