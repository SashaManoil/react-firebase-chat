import React, { FC } from "react";
import { Avatar, Grid } from "@material-ui/core";
import { useStyles } from "./styles";

interface ChatMessagesProps {
    userName: string;
}
const ChatMessages: FC<ChatMessagesProps> = (props) => {
    const { userName } = props;
    const classes = useStyles();

    return (
        <Grid item xs className={classes.header}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <span className={classes.userName}>{userName}</span>
        </Grid>
    );
};

export default ChatMessages;
