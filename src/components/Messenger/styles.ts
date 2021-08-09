import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        messenger: {
            position: "relative",
        },
        chat: {
            height: "100%",
        },
    })
);
