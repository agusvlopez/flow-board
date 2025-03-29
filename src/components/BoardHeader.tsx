import { useNavigate } from "react-router-dom"
import { useBoardActions } from "../hooks/useBoardActions"
import { useBoardCRUD } from "../hooks/useBoardCRUD"
import { Board, Board as BoardType } from "../types"
import { handleEditEntity } from "../utils/boardForms"
import { ActionsMenu } from "./ActionsMenu"
import { BaseModal } from "./BaseModal"

interface Props {
    board: BoardType
}

export function BoardHeader({ board }: Props) {
    const navigate = useNavigate()

    const {
        isOpenEditBoardModal,
        isOpenDeleteBoardModal,
        openEditBoardModal,
        openDeleteBoardModal,
        closeDeleteBoardModal,
        closeEditBoardModal
    } = useBoardActions()

    const { editBoard, deleteBoard } = useBoardCRUD()

    const handleDeleteBoard = (boardId: Board["id"]) => {
        navigate(-1)
        deleteBoard(boardId)
    }


    return (
        <>
            {isOpenEditBoardModal &&
                <BaseModal
                    variant="edit"
                    handleEdit={(event) => handleEditEntity(
                        event,
                        board?.id,
                        editBoard,
                        closeEditBoardModal,
                        "board"
                    )}
                    isOpenModal={isOpenEditBoardModal}
                    handleCloseModal={closeEditBoardModal}
                    defaultValue={board?.name} />
            }
            {isOpenDeleteBoardModal &&
                <BaseModal variant="delete"
                    handleDelete={() => handleDeleteBoard(board.id)}
                    isOpenModal={isOpenDeleteBoardModal}
                    handleCloseModal={closeDeleteBoardModal} />
            }
            <div className="board-actions--container">
                <h2>{board?.name}</h2>
                <ActionsMenu elementId={board.id} editAction={openEditBoardModal} deleteAction={openDeleteBoardModal} />
            </div>
        </>
    )
}