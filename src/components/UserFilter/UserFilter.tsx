import React, { FC, useState } from "react";
import Input from "../Input/Input";

const UserFilter: FC<any> = (props) => {
    const { onChange, value } = props;
    // const [search, setSearch] = useState<string>("");

    // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearch(event.target.value);
    // };

    return (
        <>
            <Input
                label="Search"
                name="search"
                value={value}
                onChange={onChange}
                variant="outlined"
            />
        </>
    );
};

export default UserFilter;
