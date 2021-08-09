import { ChatBubbleOutlineOutlined } from "@material-ui/icons";
import { FC } from "react";
import { useStyles } from "./styles";

const EmptyMessage: FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.emptyMessage}>
            <ChatBubbleOutlineOutlined fontSize="large"></ChatBubbleOutlineOutlined>
            <span className={classes.emptyMessageText}>No messages</span>
        </div>
    );
};

export default EmptyMessage;
