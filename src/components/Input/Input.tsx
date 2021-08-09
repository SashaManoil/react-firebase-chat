import React, { FC } from "react";
import { TextField } from "@material-ui/core";

interface InputProps {
    label: string;
    name: string;
    value: string;
    type?: string;
    autoFocus?: boolean;
    variant?: "standard" | "filled" | "outlined";
    error?: any;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input: FC<InputProps> = (props) => {
    const {
        type,
        name,
        label,
        value,
        autoFocus,
        error = null,
        variant,
        onChange,
    } = props;

    return (
        <TextField
            type={type}
            name={name}
            label={label}
            autoComplete="off"
            defaultValue={value}
            onChange={onChange}
            autoFocus={autoFocus}
            fullWidth
            variant={variant}
            {...(error && { error: true, helperText: error })}
        />
    );
};

export default Input;
