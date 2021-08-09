import React from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import { useState, FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../../actions";
import { SignIn } from "../../interfaces";
import Input from "../Input/Input";
import { useStyles } from "./styles";

interface SignInFormProps {
    title: string;
}

const SignInForm: FC<SignInFormProps> = (props) => {
    const { title } = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const [state, setState] = useState<SignIn>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<SignIn>({
        email: "",
        password: "",
    });

    const validate = () => {
        const temp = {
            email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(state.email)
                ? ""
                : "Email is not valid.",
            password:
                state.password.length >= 6
                    ? ""
                    : "Password should be at least 6 characters.",
        };

        setErrors({ ...temp });
        return Object.values(temp).every((x) => x === "");
    };

    const handleSubmit = async (ev: React.SyntheticEvent) => {
        ev.preventDefault();

        if (validate()) {
            dispatch(signIn(state.email, state.password));
        }
    };
    const handleChange =
        (prop: keyof SignIn) =>
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
                    label="Enter email"
                    value={state.email}
                    name="name"
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
                <Link className={classes.loginLink} to="/SignUp">
                    Sign Up!
                </Link>
            </div>
        </Paper>
    );
};

export default SignInForm;
