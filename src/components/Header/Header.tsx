import React, { FC } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { useStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions";
import { ExitToApp } from "@material-ui/icons";

const Header: FC = () => {
    const classes = useStyles();

    const auth = useSelector((state: any) => state.auth);

    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logout(auth.uid));
    };

    return (
        <div className={classes.header}>
            <div className={classes.headerInfo}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <span className={classes.userInfo}>{auth.name}</span>
            </div>
            <div>
                <IconButton
                    aria-label="logout"
                    className={classes.logoutButton}
                    onClick={handleLogout}
                >
                    <ExitToApp fontSize="medium" />
                </IconButton>
            </div>
        </div>
    );
};

export default Header;
