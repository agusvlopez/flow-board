import { NavLink } from "react-router-dom"
import { useBoardsStore } from "../store/boards"
import { Board } from "../components/Board"
import { BaseCard } from "../components/BaseCard"
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { handleAddEntity } from "../utils/boardForms"
import { useBoardActions } from "../hooks/useBoardActions"

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

    const boards = useBoardsStore(state => state.boards)

    const createBoard = useBoardsStore(state => state.createBoard)
    const { isOpenBoardModal, openBoardModal, closeBoardModal } = useBoardActions()

    return (
        <>
            {/* //TODO: USE BASE MODAL COMPONENT */}
            <Modal
                open={isOpenBoardModal}
                onClose={closeBoardModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create a new board
                    </Typography>
                    <form onSubmit={(event) =>
                        handleAddEntity(
                            event,
                            createBoard,
                            closeBoardModal,
                            "board-new"
                        )}>
                        <TextField name="board-new" id="board-new" label="Name" variant="standard" autoFocus />
                        <Button type="submit">Create</Button>
                    </form>
                </Box>
            </Modal>

            <h1>Flow board</h1>

            <div className='boards-container'>
                <span style={{ cursor: 'pointer' }}>
                    <BaseCard variant="newBoard" classStyle="board-card" handleOnClick={openBoardModal}>
                        <Typography style={{ textAlign: 'left', fontWeight: 'bold' }}>Add new board +</Typography>
                    </BaseCard>
                </span>
                {boards.map((b) => {
                    return (
                        <NavLink
                            to={`/board/${b.id}`}
                            key={b.id}
                            style={{ textDecoration: 'none' }}
                        >
                            <Board board={b} />
                        </NavLink>
                    )
                })}
            </div>
        </>
    )
}