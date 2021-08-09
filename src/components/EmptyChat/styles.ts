import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        emptyChat: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
        },
        emptyChatText: {
            ...theme.typography.body1,
            marginTop: theme.spacing(1),
        },
    })
);
