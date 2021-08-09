import React, { FC } from "react";
import { ChatBubbleOutlineOutlined } from "@material-ui/icons";
import { useStyles } from "./styles";

const EmptyMessage: FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.emptyMessage}>
            <ChatBubbleOutlineOutlined fontSize="large" />
            <span className={classes.emptyMessageText}>No messages</span>
        </div>
    );
};

export default EmptyMessage;
