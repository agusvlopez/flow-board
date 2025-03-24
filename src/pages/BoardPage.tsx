import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardActions, CardContent, List, ListItem, TextField } from "@mui/material"
import { Board, Card as CardType, List as ListType } from "../types"
import { BaseModal } from "../components/BaseModal"
import { useBoardActions } from "../hooks/useBoardActions"
import { useBoardCRUD } from "../hooks/useBoardCRUD"
import { handleAddEntity, handleEditEntity } from "../utils/boardForms"
import { useBoardData } from "../hooks/useBoardData"
import { ActionableLabel } from "../components/ActionableLabel"
import { useCallback } from "react"
import { ActionsMenu } from "../components/ActionsMenu"
import { BaseCard } from "../components/BaseCard"
import CheckIcon from '@mui/icons-material/Check'

export function BoardPage() {
    const { id } = useParams()
    const navigate = useNavigate();

    const {
        loading,
        error,
        board,
        boardLists,
        getCardsForList
    } = useBoardData(id as Board["id"]);

    const {
        isOpenDeleteBoardModal,
        openDeleteBoardModal,
        closeDeleteBoardModal,
        isOpenEditBoardModal,
        openEditBoardModal,
        closeEditBoardModal,

        isInputList,
        openInputAddList,
        closeInputAddList,
        editListInput,
        openInputEditList,
        closeInputEditList,

        inputCard,
        openInputAddCard,
        closeInputAddCard,
        editCardInput,
        openInputEditCard,
        closeInputEditCard

    } = useBoardActions()

    const {
        deleteBoard,
        editBoard,

        addList,
        editList,
        deleteList,

        addCard,
        editCard,
        deleteCard
    } = useBoardCRUD()

    //DELETE - list, card & board
    const handleDeleteBoard = (boardId: Board["id"]) => {
        navigate(-1)
        deleteBoard(boardId)
    }
    const handleEditList = useCallback((listId: ListType["id"]) => {
        openInputEditList(listId);
    }, [openInputEditList]);

    const handleDeleteList = useCallback((listId: ListType["id"]) => {
        deleteList(listId);
    }, [deleteList]);

    const handleEditCard = useCallback((cardId: CardType["id"]) => {
        openInputEditCard(cardId);
    }, [openInputEditCard]);

    const handleDeleteCard = useCallback((cardId: CardType["id"]) => {
        deleteCard(cardId);
    }, [deleteCard]);

    if (loading) return <div>Loading board...</div>
    if (error) return <div>Error: {error as string}</div>//todo: check this
    if (!board) return <div>Board not found</div>

    return (
        <>
            {isOpenEditBoardModal &&
                <BaseModal variant="edit" handleEdit={(event) => handleEditEntity(event, board?.id, editBoard, closeEditBoardModal, "board")} isOpenModal={isOpenEditBoardModal} handleCloseModal={closeEditBoardModal} defaultValue={board?.name} />
            }
            {isOpenDeleteBoardModal &&
                <BaseModal variant="delete" handleDelete={() => handleDeleteBoard(board.id)} isOpenModal={isOpenDeleteBoardModal} handleCloseModal={closeDeleteBoardModal} />
            }
            <div className="board-actions--container">
                <h2>Board: {board?.name}</h2>
                <ActionsMenu elementId={board.id} editAction={openEditBoardModal} deleteAction={openDeleteBoardModal} />
            </div>

            {/* LISTS */}
            <section className="lists-container" style={{ height: '75vh' }}>
                {boardLists?.map(list => (
                    <Card
                        key={list.id}
                        sx={{
                            width: 360,
                            padding: '12px',
                            flexShrink: 0,
                            overflow: 'hidden',
                            height: 'fit-content',
                            maxHeight: '90%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <CardContent sx={{
                            margin: 0,
                            padding: 0,
                            paddingRight: 2,
                            maxHeight: '80%',
                            overflowY: 'auto',
                            width: 340,
                            flexGrow: 1,
                        }}>
                            <List>
                                <ListItem key={list.id}>
                                    <ActionableLabel
                                        editMode={editListInput === list.id}
                                        handleOnSubmit={(event) => handleEditEntity(event, list.id, editList, closeInputEditList, "list-edit")}
                                        defaultValue={list.name}
                                        labelName="list-edit"
                                        labelButton="Edit List"
                                        name={list.name}
                                        handleEdit={() => {
                                            handleEditList(list.id);
                                        }}
                                    />
                                    <ActionsMenu
                                        elementId={list.id}
                                        editAction={() => {
                                            handleEditList(list.id);
                                        }}
                                        deleteAction={() => {
                                            handleDeleteList(list.id);
                                        }}
                                    />
                                </ListItem>
                            </List>
                            <CardContent sx={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {getCardsForList(list.id).map((card) => (
                                    <BaseCard variant="card" classStyle="card-item">
                                        <List>
                                            <ListItem key={list.id} className="actionable-label--container">
                                                <ActionableLabel
                                                    editMode={editCardInput === card.id}
                                                    handleOnSubmit={(event) => handleEditEntity(event, card.id, editCard, closeInputEditCard, "card-edit", { listId: list.id })}
                                                    defaultValue={card.name}
                                                    labelName="card-edit"
                                                    labelButton="Edit Card"
                                                    name={card.name}
                                                    handleEdit={() => {
                                                        handleEditCard(card.id);
                                                    }}
                                                />
                                                <ActionsMenu
                                                    elementId={card.id}
                                                    editAction={() => {
                                                        handleEditCard(card.id);
                                                    }}
                                                    deleteAction={() => {
                                                        handleDeleteCard(card.id);
                                                    }}
                                                />
                                            </ListItem>
                                        </List>
                                    </BaseCard>
                                ))}
                            </CardContent>
                        </CardContent>

                        <CardActions
                            sx={{
                                flexShrink: 0,
                                marginTop: 'auto',
                                padding: '8px',
                            }}
                        >
                            <div>
                                {inputCard !== list.id &&
                                    <Button onClick={() => {
                                        openInputAddCard(list.id)
                                    }}
                                        sx={{ height: 'fit-content', margin: '0', padding: 0 }}
                                    >
                                        + Add a card
                                    </Button>
                                }
                                {inputCard === list.id &&
                                    <form onSubmit={(event) =>
                                        handleAddEntity(event, addCard, closeInputAddCard, "card-new", { listId: list.id })
                                    }
                                        style={{ display: 'flex', alignItems: 'center' }}
                                    >
                                        <TextField
                                            name="card-new"
                                            id="card-new"
                                            variant="standard"
                                            placeholder="New Card"
                                            autoFocus
                                        />
                                        <Button
                                            sx={{ width: 'fit-content' }}
                                            type="submit"
                                            aria-label="Confirm"
                                        ><CheckIcon /></Button>
                                        <Button
                                            onClick={closeInputAddCard}
                                            sx={{ width: 'fit-content' }}
                                            type="submit"
                                            aria-label="Close"
                                        >X</Button>
                                    </form>
                                }
                            </div>

                        </CardActions>
                    </Card>
                ))}
                <div>
                    {isInputList &&
                        <BaseCard variant="newList">
                            <form onSubmit={(event) => {
                                handleAddEntity(event, addList, closeInputAddList, "list-new", { boardId: board?.id })
                                closeInputAddList()
                            }}
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <TextField
                                    name="list-new"
                                    id="list-new"
                                    variant="standard"
                                    placeholder="New List"
                                    autoFocus
                                />
                                <Button
                                    sx={{ width: 'fit-content' }}
                                    type="submit"
                                    aria-label="Confirm"
                                ><CheckIcon /></Button>
                            </form>
                        </BaseCard>
                    }
                    {!isInputList &&
                        <Button
                            size="small"
                            onClick={openInputAddList}
                            sx={{ height: 'fit-content', margin: '0', padding: 0 }}
                        >
                            <BaseCard variant="newList">
                                Add List +
                            </BaseCard>
                        </Button>
                    }
                </div>
            </section >
        </>
    )
}