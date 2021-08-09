import { Button, Paper, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useState, FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signUp } from '../../actions'
import { SignUp, User } from "../../interfaces";
import Input from "../Input/Input";

const useStyles = makeStyles((theme: Theme) =>
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

interface SignUpFormProps {
    title: string;
}

const SignUpForm: FC<SignUpFormProps> = ({ title }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [state, setState] = useState<SignUp>({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    const [errors, setErrors] = useState<SignUp>({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    const validate = () => {
        const temp: SignUp = {
            name: state.name && state.name.length >= 4 ? "" : "Name should be at least 4 characters.",
            email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(state.email) ? "" : "Email is not valid.",
            password:
                state.password.length >= 6
                    ? ""
                    : "Password should be at least 6 characters.",
            passwordConfirmation:
                state.password === state.passwordConfirmation && state.password
                    ? ""
                    : "Password do not match.",
        };
        
        setErrors({ ...temp });

        return Object.values(temp).every((x) => x === "");
    };

    const handleSubmit = (ev: React.SyntheticEvent) => {
        ev.preventDefault();

        if (validate()) {
            const user: User = {
                name: state.name,
                email: state.email,
                password: state.password
            }
            dispatch(signUp(user))
        }
    };
    const handleChange =
        (prop: keyof SignUp) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setState({ ...state, [prop]: event.target.value });
        };
    return (
        <Paper className={classes.formPaper}>
            <Typography className={classes.formTitle} variant="h5">
                {title}
            </Typography>
            <form
                className={classes.root}
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <Input
                    label="Enter name"
                    value={state.name || ""}
                    name="name"
                    onChange={handleChange("name")}
                    error={errors.name}
                />
                <Input
                    label="Enter email"
                    value={state.email}
                    name="email"
                    onChange={handleChange("email")}
                    error={errors.email}
                />
                <Input
                    type="password"
                    label="Password"
                    value={state.password}
                    name="password"
                    onChange={handleChange("password")}
                    error={errors.password}
                />
                <Input
                    type="password"
                    label="Confirm password"
                    value={state.password}
                    name="repeat-password"
                    onChange={handleChange("passwordConfirmation")}
                    error={errors.passwordConfirmation}
                />
                <div className={classes.formButtonContainer}>
                    <Button
                        type="submit"
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                    >
                        Enter
                    </Button>
                </div>
            </form>
            <div className={classes.formNavigation}>
                <Link className={classes.loginLink} to="/SignIn">
                    Sign In!
                </Link>
            </div>
        </Paper>
    );
};

export default SignUpForm;
