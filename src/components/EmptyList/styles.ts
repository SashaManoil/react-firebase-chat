import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        emptyList: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
        },
        emptyListText: {
            ...theme.typography.body1,
            marginTop: theme.spacing(1),
        },
    })
);
