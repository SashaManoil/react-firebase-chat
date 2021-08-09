import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chatContainer: {
            height: "100vh",
        },
        sidebar: {
            padding: theme.spacing(1),
            boxShadow: "0px 1px 3px 0px rgb(0 0 0 / 12%)",
            position: "relative",
        },
        userList: {
            position: "static",
        },
        rightSide: {
            height: "100%",
        },
        userInfo: {
            display: "flex",
            alignItems: "center",
        },
        userName: {
            marginLeft: theme.spacing(1),
            ...theme.typography.body1,
        },
        header: {
            flex: "0",
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(2),
            boxShadow: "0px 1px 1px 0px rgb(0 0 0 / 12%)",
        },
        chat: {
            padding: theme.spacing(2),
            overflow: "auto",
            position: "relative",
        },
        messageList: {
            display: "flex",
            flexFlow: "column",
            alignItems: "flex-start",
        },
        textarea: {
            flex: "0",
            padding: theme.spacing(1),
            boxShadow: "0px -1px 1px 0px rgb(0 0 0 / 12%)",
            display: "flex",
            alignItems: "center",
            position: "relative",
            "& textarea": {
                width: "100%",
                marginRight: "10px",
            },
            "& .emoji-picker-react": {
                position: "absolute",
                right: "60px",
                bottom: "100%",
                zIndex: 1,
            },
        },
        logoutButton: {
            marginLeft: "auto",
        },
        emojiButton: {
            // position: "absolute",
        },
        sendButton: {
            // position: "absolute"
        },
    })
);
