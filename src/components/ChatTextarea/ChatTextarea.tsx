import { Grid, IconButton } from "@material-ui/core";
import { MoodRounded, SendRounded } from "@material-ui/icons";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage } from "../../actions/user.actions";
import { useStyles } from "./styles";
import Picker from "emoji-picker-react";

interface ChatTextareaProps {
    userUid: string;
}
const ChatTextarea: FC<ChatTextareaProps> = (props) => {
    const { userUid } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const auth = useSelector((state: any) => state.auth);

    const [message, setMessage] = useState<string>("");
    const [emojiState, setEmojiState] = useState<boolean>(false);

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
    return (
        <>
            <Grid item xs className={classes.textarea}>
                <textarea
                    name="message"
                    value={message}
                    onKeyPress={handleMessage}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                ></textarea>
                {emojiState && (
                    <div onMouseLeave={() => setEmojiState(false)}>
                        <Picker
                            onEmojiClick={onEmojiClick}
                            disableAutoFocus={true}
                            groupNames={{
                                smileys_people: "PEOPLE",
                            }}
                            native
                        />
                    </div>
                )}
                <IconButton aria-label="emoji" onClick={showEmoji}>
                    <MoodRounded fontSize="large" />
                </IconButton>
                <IconButton aria-label="send" onClick={sendMessage}>
                    <SendRounded fontSize="large" />
                </IconButton>
            </Grid>
        </>
    );
};

export default ChatTextarea;
