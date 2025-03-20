import { NavLink, useNavigate, useParams } from "react-router-dom"
import { Button, Card, List, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Board } from "../types";
import { BaseModal } from "../components/BaseModal";
import { useBoardActions } from "../hooks/useBoardActions";
import { useBoardCRUD } from "../hooks/useBoardCRUD";
import { handleAddEntity, handleEditEntity } from "../utils/boardForms";
import { useBoardData } from "../hooks/useBoardData";

export function BoardPage() {
    const { id } = useParams() // Obtener el ID de la URL
    const navigate = useNavigate();

    const {
        loading,
        error,
        board,
        boardLists,
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

        cards,
        addCard,
        editCard,
        deleteCard
    } = useBoardCRUD()

    //DELETE - list, card & board
    const handleDeleteBoard = (boardId: Board["id"]) => {
        navigate(-1)
        deleteBoard(boardId)
    }

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
                    <Card sx={{ width: 360, margin: '32px 0', height: 'fit-content', flexShrink: 0 }}>
                        <List>
                            <ListItem key={list.id}>
                                {editListInput === list.id ?
                                    <form onSubmit={(event) => handleEditEntity(event, list.id, editList, closeInputEditList, "list-edit")}>
                                        <TextField defaultValue={list.name} name="list-edit" id="list-edit" variant="standard" />
                                        <Button type="submit">Edit list</Button>
                                    </form>
                                    :
                                    <ListItemText sx={{ color: 'green' }}>
                                        Lista: {list.name}
                                    </ListItemText>
                                }

                                <ListItemIcon style={{ cursor: 'pointer' }} onClick={() => openInputEditList(list.id)}>
                                    <EditOutlinedIcon />
                                </ListItemIcon>
                                <ListItemIcon style={{ cursor: 'pointer' }} onClick={() => deleteList(list.id)}>
                                    <DeleteOutlineOutlinedIcon />
                                </ListItemIcon>
                            </ListItem>

                            {cards
                                .filter((card) => list?.cards?.includes(card.id))
                                .map((card) => (
                                    <List key={card.id}>
                                        <ListItem key={list.id}>
                                            {editCardInput === card.id ?
                                                <form onSubmit={(event) => handleEditEntity(event, card.id, editCard, closeInputEditCard, "card-edit", { listId: list.id })}>
                                                    <TextField defaultValue={card.name} name="card-edit" id="card" variant="standard" />
                                                    <Button type="submit">Edit card</Button>
                                                </form>
                                                :
                                                <ListItemText>
                                                    Card: {card.name}
                                                </ListItemText>
                                            }

                                            <ListItemIcon style={{ cursor: 'pointer' }} onClick={() => openInputEditCard(card.id)}>
                                                <EditOutlinedIcon />
                                            </ListItemIcon>
                                            <ListItemIcon style={{ cursor: 'pointer' }} onClick={() => deleteCard(card.id)}>
                                                <DeleteOutlineOutlinedIcon />
                                            </ListItemIcon>
                                        </ListItem>
                                    </List>
                                ))}

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
                        </List>
                    </Card>
                ))}
            </section>
        </>
    )
}