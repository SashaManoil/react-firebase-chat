import React, { FC } from "react";
import { FaceOutlined } from "@material-ui/icons";
import { useStyles } from "./styles";

const EmptyChat: FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.emptyChat}>
            <FaceOutlined fontSize="large" />
            <span className={classes.emptyChatText}>Select user</span>
        </div>
    );
};

export default EmptyChat;
