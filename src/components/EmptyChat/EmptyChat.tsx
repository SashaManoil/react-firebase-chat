import { FaceOutlined } from "@material-ui/icons";
import { FC } from "react";
import { useStyles } from "./styles";

const EmptyChat: FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.emptyChat}>
            <FaceOutlined fontSize="large"></FaceOutlined>
            <span className={classes.emptyChatText}>Select user</span>
        </div>
    );
};

export default EmptyChat;
