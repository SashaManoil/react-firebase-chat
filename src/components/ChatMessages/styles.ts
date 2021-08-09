import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    })
);
