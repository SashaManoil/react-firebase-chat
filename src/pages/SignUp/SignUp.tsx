import { FC } from 'react';
import {CssBaseline, Container,} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Form from '../../components/Forms/SignUpForm';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

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


const SignUp: FC = () => {
    const classes = useStyles();
    const auth = useSelector((state: any) => state.auth);

    if(auth.authenticated) {
      return <Redirect to={`/`} />
    }
    return (
    <>
        <CssBaseline />
        <Container className={classes.formContainer}>
            <Form title="Sign Up" />
        </Container>
    </>
    )
}

export default SignUp;