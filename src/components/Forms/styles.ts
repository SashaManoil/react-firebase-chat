import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& .MuiTextField-root": {
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
                width: "100%",
            },
            "& .MuiButtonBase-root": {
                marginTop: theme.spacing(2),
            },
        },
        formPaper: {
            padding: "20px",
            maxWidth: "400px",
        },
        formTitle: {
            textAlign: "center",
        },
        formButtonContainer: {
            textAlign: "center",
        },
        formNavigation: {
            textAlign: "center",
        },
        loginLink: {
            marginTop: theme.spacing(2),
            display: "inline-block",
            textDecoration: "none",
            color: "#1976d2",
            fontSize: "1rem",
        },
    })
);
