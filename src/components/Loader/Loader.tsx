import { FC } from "react";
import { CircularProgress } from "@material-ui/core";
import { useStyles } from "./styles";


const Loader: FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.loaderContainer}>
            <CircularProgress color="inherit" />
        </div>
    );
}

export default Loader;