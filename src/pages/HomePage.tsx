import { NavLink } from "react-router-dom";
import { Menu } from "../components/Menu";
import { useBoardsStore } from "../store/boards";
import { Board } from "../components/Board";
import { BaseCard } from "../components/BaseCard";
import { useState } from "react";
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

export function HomePage() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const boards = useBoardsStore(state => state.boards)

    const createBoard = useBoardsStore(state => state.createBoard)

    const handleCreateBoard = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const field = new FormData(event.currentTarget)
        const board = field.get('board') as string

        createBoard({ name: board, id: crypto.randomUUID(), lists: [] })

        setOpen(false)
    }


    return (
        <>
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

            <h1>Flow board</h1>
            <Menu />
            <div className='boards-container'>
                <span>
                    <BaseCard classStyle="board-card" handleOnClick={handleOpen}>
                        Add new Board
                    </BaseCard>
                </span>
                {boards.map((b) => {
                    return (
                        <NavLink to={`/board/${b.id}`} style={{ textDecoration: 'none' }}>
                            <Board board={b} />
                        </NavLink>
                    )
                })}
            </div>
        </>
    )
}