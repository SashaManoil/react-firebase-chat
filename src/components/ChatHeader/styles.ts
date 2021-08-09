import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            flex: "0",
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(2),
            boxShadow: "0px 1px 1px 0px rgb(0 0 0 / 12%)",
        },
        userName: {
            marginLeft: theme.spacing(1),
            ...theme.typography.body1,
        },
    })
);
