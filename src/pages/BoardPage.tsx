import { NavLink, useNavigate, useParams } from "react-router-dom"
import { Button, Card, List, ListItem, TextField } from "@mui/material"
import { Board, Card as CardType, List as ListType } from "../types";
import { BaseModal } from "../components/BaseModal";
import { useBoardActions } from "../hooks/useBoardActions";
import { useBoardCRUD } from "../hooks/useBoardCRUD";
import { handleAddEntity, handleEditEntity } from "../utils/boardForms";
import { useBoardData } from "../hooks/useBoardData";
import { ActionableLabel } from "../components/ActionableLabel";
import { useCallback } from "react";
import { ActionsMenu } from "../components/ActionsMenu";
import { BaseCard } from "../components/BaseCard";

export function BoardPage() {
    const { id } = useParams() // Obtener el ID de la URL
    const navigate = useNavigate();

    const {
        loading,
        error,
        board,
        boardLists,
        getCardsForList
    } = useBoardData(id as Board["id"]);

    const {
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
                <BaseModal handleEdit={(event) => handleEditEntity(event, board?.id, editBoard, closeEditBoardModal, "board")} openModal={isOpenEditBoardModal} handleCloseModal={closeEditBoardModal} defaultValue={board?.name} />
            }

            <h2>Board: {board?.name}</h2>
            <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
                <NavLink to="/">My boards</NavLink>
                <div>
                    <Button size="small" onClick={openInputAddList}>Add List</Button>
                    <Button size="small" color="secondary" onClick={openEditBoardModal}>Edit board</Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => handleDeleteBoard(board?.id ?? "")}>Delete board</Button>
                </div>
            </nav>

            {isInputList &&
                <>
                    <form onSubmit={(event) =>
                        handleAddEntity(event, addList, closeInputAddList, "list-new", { boardId: board?.id })
                    }>

                        <TextField name="list-new" id="list-new" label="List name" variant="standard" />
                        <Button type="submit">Add list</Button>
                    </form>
                    <button onClick={closeInputAddList}>X</button>
                </>
            }
            {/* LISTS */}
            <section className="lists-container">
                {boardLists?.map(list => (
                    <Card key={list.id} sx={{ width: 360, margin: '32px 0', padding: '12px', height: 'fit-content', flexShrink: 0 }}>
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
                                        handleEditList(list.id)
                                    }}
                                />
                                <ActionsMenu
                                    elementId={list.id}
                                    editAction={() => {
                                        handleEditList(list.id)
                                    }}
                                    deleteAction={() => {
                                        handleDeleteList(list.id)
                                    }}
                                />
                            </ListItem>
                        </List>
                        <div className="cards-container">
                            {getCardsForList(list.id).map((card) => (
                                <BaseCard>
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
                                                    handleEditCard(card.id)
                                                }}
                                            />
                                            <ActionsMenu
                                                elementId={card.id}
                                                editAction={() => {
                                                    handleEditCard(card.id)
                                                }}
                                                deleteAction={() => {
                                                    handleDeleteCard(card.id)
                                                }}
                                            />
                                        </ListItem>
                                    </List>
                                </BaseCard>
                            ))}
                        </div>

                        <Button onClick={() => openInputAddCard(list.id)}>Add a card</Button>
                        {inputCard === list.id &&
                            <Card sx={{ width: 320, margin: '24px auto', padding: 2, bgcolor: '#1E1E1E' }}>
                                <button onClick={closeInputAddCard}>X</button>
                                <form onSubmit={(event) =>
                                    handleAddEntity(event, addCard, closeInputAddCard, "card-new", { listId: list.id })
                                }>

                                    <TextField name="card-new" id="standard-basic" label="Card name" variant="standard" />
                                    <Button type="submit">Add card</Button>
                                </form>
                            </Card>
                        }
                    </Card>
                ))}
            </section>
        </>
    )
}