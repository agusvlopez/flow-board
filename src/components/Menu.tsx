import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useBoardsStore } from "../store/boards";
import { useState } from "react";

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

export function Menu() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const createBoard = useBoardsStore(state => state.createBoard)

    const handleCreateBoard = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const field = new FormData(event.currentTarget)
        const board = field.get('board') as string

        createBoard({ name: board, id: crypto.randomUUID() })

        setOpen(false)
    }

    return (
        <div>
            <Button sx={{ bgcolor: '#80CBC4', color: '#3D3D3D', fontWeight: 'semibold' }} variant="contained" onClick={handleOpen}>Create board</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create a new board
                    </Typography>
                    <form action="" onSubmit={handleCreateBoard}>
                        <TextField name="board" id="standard-basic" label="Standard" variant="standard" />
                        <Button type="submit">Create</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}