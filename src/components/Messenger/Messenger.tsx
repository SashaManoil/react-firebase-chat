import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatTextarea from "../ChatTextarea/ChatTextarea";
import EmptyChat from "../EmptyChat/EmptyChat";
import { useStyles } from "./styles";

const Messenger: FC<any> = (props) => {
    const { started, userName, userUid } = props;
    const classes = useStyles();

    return (
        <Grid item xs className={classes.messenger}>
            {started ? (
                <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    className={classes.chat}
                >
                    <ChatHeader userName={userName} />
                    <ChatMessages />
                    <ChatTextarea userUid={userUid} />
                </Grid>
            ) : (
                <EmptyChat />
            )}
        </Grid>
    );
};

export default Messenger;
