import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Props {
    variant: "edit" | "delete"
    handleEdit?: (event: React.FormEvent<HTMLFormElement>) => void
    handleDelete?: () => void
    isOpenModal: boolean
    handleCloseModal: () => void
    defaultValue?: string
}

export function BaseModal({ variant, handleEdit, handleDelete, isOpenModal, handleCloseModal, defaultValue }: Props) {

    return (
        <Modal
            open={isOpenModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {variant === "edit" && "Edit board"}
                    {variant === "edit" && "Delete board"}
                </Typography>
                {variant === "edit" &&
                    <form action="" onSubmit={handleEdit}>
                        <TextField defaultValue={defaultValue} name="board" id="standard-basic" label="Standard" variant="standard" autoFocus />
                        <Button type="submit">
                            Edit
                        </Button>
                    </form>
                }
                {variant === "delete" &&
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <Typography>Are you sure you want to delete?</Typography>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleDelete}>
                                Delete
                            </Button>
                        </div>
                    </div>
                }
            </Box>
        </Modal>
    )
}