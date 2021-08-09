import React, { FC } from "react";
import { List } from "@material-ui/core";
import UserItem from "../UserItem/UserItem";
import EmptyList from "../EmptyList/EmptyList";
import { useStyles } from "./styles";

const UserList: FC<any> = (props) => {
    const { onClick, users } = props;
    const classes = useStyles();

    return (
        <List className={classes.userList}>
            {users.length ? (
                users.map((user: any) => (
                    <UserItem onClick={onClick} user={user} key={user.uid} />
                ))
            ) : (
                <EmptyList />
            )}
        </List>
    );
};

export default UserList;
