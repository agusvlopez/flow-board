import { Box, Button, Card, CardActions, CardContent, Modal, TextField, Typography } from "@mui/material"
import { Board as BoardType } from "../types"
import { useBoardsStore } from "../store/boards"
import { useState } from "react"

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

export function Board(board: BoardType) {
    const [openModal, setOpenModal] = useState(false)
    const deleteBoard = useBoardsStore(state => state.deleteBoard)
    const editBoard = useBoardsStore(state => state.editBoard)

    const handleEditBoard = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const field = new FormData(event.currentTarget)
        const inputBoard = field.get('board') as string

        editBoard({ name: inputBoard, id: board.id })

        setOpenModal(false)
    }

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return (
        <>
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
                    <form action="" onSubmit={handleEditBoard}>
                        <TextField defaultValue={board.name} name="board" id="standard-basic" label="Standard" variant="standard" />
                        <Button type="submit">Edit</Button>
                    </form>
                </Box>
            </Modal>
            <Card sx={{ width: 275 }}>
                <CardContent>
                    <Typography variant="h4" component="h3" gutterBottom>
                        {board.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="secondary" onClick={handleOpenModal}>Edit board</Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => deleteBoard(board.id)}>Delete board</Button>
                </CardActions>
            </Card>
        </>
    )
}