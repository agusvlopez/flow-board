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
    handleEdit: (event: React.FormEvent<HTMLFormElement>) => void
    openModal: boolean
    handleCloseModal: () => void
    defaultValue?: string
}

export function BaseModal({ handleEdit, openModal, handleCloseModal, defaultValue }: Props) {

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit board
                </Typography>
                <form action="" onSubmit={handleEdit}>
                    <TextField defaultValue={defaultValue} name="board" id="standard-basic" label="Standard" variant="standard" />
                    <Button type="submit">Edit</Button>
                </form>
            </Box>
        </Modal>
    )
}