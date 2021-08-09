import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    })
);
