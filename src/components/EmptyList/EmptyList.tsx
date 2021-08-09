import React, { FC } from "react";
import { PeopleAltOutlined } from "@material-ui/icons";
import { useStyles } from "./styles";

const EmptyList: FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.emptyList}>
            <PeopleAltOutlined fontSize="large" />
            <span className={classes.emptyListText}>No users</span>
        </div>
    );
};

export default EmptyList;
