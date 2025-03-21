import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

interface Props {
    editMode: boolean,
    handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    defaultValue: string,
    labelName: string,
    labelButton: string,
    name: string,
    handleEdit?: () => void
}

export function ActionableLabel({ editMode, handleOnSubmit, defaultValue, labelName, labelButton, name, handleEdit }: Props) {
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (editMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editMode])

    return (
        <div className="actionable-label">
            {editMode ?
                <form onSubmit={handleOnSubmit}>
                    <TextField
                        defaultValue={defaultValue}
                        name={labelName}
                        id={labelName}
                        variant="standard"
                        inputRef={inputRef}
                    />
                    <Button type="submit"><span style={{ visibility: 'hidden' }}>{labelButton}</span></Button>
                </form>
                :
                <Typography onDoubleClick={handleEdit}>
                    {name}
                </Typography>
            }
        </div>
    )
}