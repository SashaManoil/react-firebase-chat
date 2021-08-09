import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        messageBox: {
            padding: theme.spacing(2),
            paddingBottom: theme.spacing(4),
            maxWidth: "600px",
            minWidth: "200px",
            marginBottom: theme.spacing(2),
            position: "relative",
            boxShadow:
                "0px 1px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
            "&": {
                borderRadius: "4px 35px 4px 35px",
            },
            "&.to": {
                marginLeft: "auto",
                textAlign: "right",
                borderRadius: "35px 4px 35px 4px",
            },
            "&.to $messageTime": {
                left: theme.spacing(2),
            },
            "&.from $messageTime": {
                right: theme.spacing(2),
            },
            "&.to $messageInfo": {
                flexDirection: "row-reverse",
            },
            "&.from $messageInfoName": {
                marginLeft: theme.spacing(1),
            },
            "&.to $messageInfoName": {
                marginRight: theme.spacing(1),
            },
        },
        messageInfo: {
            display: "flex",
            alignItems: "center",
            marginBottom: theme.spacing(1),
        },
        messageInfoName: {
            ...theme.typography.body1,
        },
        messageText: {
            ...theme.typography.body1,
            marginBottom: theme.spacing(1),
        },
        messageTime: {
            position: "absolute",
            bottom: theme.spacing(2),
            ...theme.typography.body2,
        },
    })
);
