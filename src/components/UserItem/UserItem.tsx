import { FC } from "react";
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@material-ui/core";
import { FirebaseUser } from "../../interfaces";
import StyledBadge from "./styles";

interface UserItemProps {
    user: FirebaseUser;
    onClick: (user: FirebaseUser) => void;
}
const UserItem: FC<UserItemProps> = (props) => {
    const { user, onClick, ...rest } = props;
    return (
        <ListItem button {...rest} onClick={() => onClick(user)}>
            <ListItemAvatar>
                {user.isOnline ? (
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        variant="dot"
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                        />
                    </StyledBadge>
                ) : (
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                    />
                )}
            </ListItemAvatar>
            <ListItemText primary={user.name} />
        </ListItem>
    );
};

export default UserItem;
