import React, { FC } from "react";
import moment from "moment";
import { useStyles } from "./styles";

interface UserMessageProps {
    message: string;
    type: "from" | "to";
    time: Date;
}
const UserMessage: FC<UserMessageProps> = (props) => {
    const { message, type, time, ...rest } = props;
    const classes = useStyles();
    const formattedTime = moment(time).format("hh:mm:ss");

    return (
        <>
            <div className={`${classes.messageBox} ${type}`} {...rest}>
                <div className={classes.messageText}>{message}</div>
                <span className={classes.messageTime}>{formattedTime}</span>
            </div>
        </>
    );
};
export default UserMessage;
