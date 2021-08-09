import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            boxSizing: "border-box",
            padding: theme.spacing(1),
            boxShadow: "0px 1px 1px 0px rgb(0 0 0 / 12%)",
        },
        headerInfo: {
            display: "flex",
            alignItems: "center",
        },
        userInfo: {
            marginLeft: theme.spacing(1),
        },
        logoutButton: {
            marginLeft: "auto",
        },
    })
);
