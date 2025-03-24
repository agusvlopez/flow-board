import { Button, TextField, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

interface Props {
    editMode: boolean,
    handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    defaultValue: string,
    labelName: string,
    labelButton: string,
    name: string,
    handleEdit?: () => void
}

export function ActionableLabel({ editMode, handleOnSubmit, defaultValue, labelName, name, handleEdit }: Props) {

    return (
        <div className="actionable-label">
            {editMode ?
                <form
                    onSubmit={handleOnSubmit}
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    <TextField
                        defaultValue={defaultValue}
                        name={labelName}
                        id={labelName}
                        variant="standard"
                        autoFocus
                    />
                    <Button
                        sx={{ width: 'fit-content' }}
                        type="submit"
                        aria-label="Confirm"
                    ><CheckIcon /></Button>
                </form>
                :
                <Typography onDoubleClick={handleEdit}>
                    {name}
                </Typography>
            }
        </div>
    )
}