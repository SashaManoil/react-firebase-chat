import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chatContainer: {
            height: "100vh",
            paddingTop: "64px",
            position: "relative",
        },
        sidebar: {
            paddingTop: theme.spacing(2),
            padding: theme.spacing(1),
            boxShadow: "1px 0px 0px 0px rgb(0 0 0 / 12%)",
            position: "relative",
        },
        userInfo: {
            display: "flex",
            alignItems: "center",
        },
    })
);
