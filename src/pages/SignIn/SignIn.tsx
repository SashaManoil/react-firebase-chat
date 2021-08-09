import { FC } from 'react';
import {CssBaseline, Container,} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Form from '../../components/Forms/SignInForm';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
        height: '100vh',
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
  }),
);


const SignIn: FC = () => {
    const classes = useStyles();
    const auth = useSelector((state: any) => state.auth);

    if(auth.authenticated) {
      return <Redirect to={`/`} />
    }

    return (
    <>
        <CssBaseline />
        <Container className={classes.formContainer}>
            <Form title="Sign In" />
        </Container>
    </>
    )
}

export default SignIn;