import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useBoardsStore } from "../store/boards"
import { Button, Card, List, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Board, Card as CardType, List as ListType } from "../types";
import { useState } from "react";
import { BaseModal } from "../components/BaseModal";

export function BoardPage() {
    const { id } = useParams() // Obtener el ID de la URL
    const navigate = useNavigate();

    const [inputList, setInputList] = useState(false)
    const [editInput, setEditInput] = useState("")
    const [editCardInput, setEditCardInput] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [openCards, setOpenCards] = useState<string>("");
    console.log("openCards ", openCards);

    const deleteBoard = useBoardsStore(state => state.deleteBoard)
    const editBoard = useBoardsStore(state => state.editBoard)
    const boards = useBoardsStore(state => state.boards)

    const lists = useBoardsStore(state => state.lists)
    const addList = useBoardsStore(state => state.addList)
    const editList = useBoardsStore(state => state.editList)
    const deleteList = useBoardsStore(state => state.deleteList)

    const cards = useBoardsStore(state => state.cards)
    const addCard = useBoardsStore(state => state.addCard)
    const editCard = useBoardsStore(state => state.editCard)
    const deleteCard = useBoardsStore(state => state.deleteCard)

    const board = boards?.find(b => b.id === id)

    // Filtrar listas que pertenecen al board
    const boardLists = lists.filter(l => board?.lists?.includes(l.id))

    const handleOpenEditList = (listId: ListType["id"]) => {
        setEditInput(listId)
    }
    const handleOpenEditCard = (cardId: CardType["id"]) => {
        setEditCardInput(cardId)
    }

    const handleEditList = (event: React.FormEvent<HTMLFormElement>, listId: ListType["id"]) => {
        event.preventDefault()

        const field = new FormData(event.currentTarget)
        const inputList = field.get('list') as string

        editList({ id: listId, name: inputList })
        setEditInput("")
    }

    const handleEditCard = (event: React.FormEvent<HTMLFormElement>, cardId: CardType["id"], listId: ListType["id"]) => {
        event.preventDefault()

        const field = new FormData(event.currentTarget)
        const inputCard = field.get('card') as string

        editCard({ id: cardId, name: inputCard, listId })
        setEditCardInput("")
    }

    const handleDeleteList = (id: ListType["id"]) => {
        deleteList(id)
    }
    const handleDeleteCard = (id: CardType["id"]) => {
        deleteCard(id)
    }


    const handleOpenList = () => {
        setInputList(true)
    }

    const handleAddList = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const field = new FormData(event.currentTarget)
        const inputName = field.get('list') as string

        if (board) {
            addList(board.id, { id: crypto.randomUUID(), name: inputName })
        }

        setInputList(false)
    }

    const openEditModal = () => {
        setOpenModal(true)
    }

    const handleEditBoard = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const field = new FormData(event.currentTarget)
        const inputBoard = field.get('board') as string

        editBoard({ name: inputBoard, id: board?.id as string })

        setOpenModal(false)
    }

    const handleDeleteBoard = (boardId: Board["id"]) => {
        navigate(-1)
        deleteBoard(boardId)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const handleAddCard = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget as HTMLFormElement
        const listId = form.getAttribute("data-list-id") as string

        const field = new FormData(event.currentTarget)
        const inputName = field.get('card') as string

        addCard({ id: crypto.randomUUID(), name: inputName, listId })
    }

    const handleOpenNewCard = (listId: string) => {
        setOpenCards(listId)
    }

    const handleCloseNewCard = () => {
        setOpenCards("")
    }

    return (
        <>
            {openModal &&
                <BaseModal handleEdit={handleEditBoard} openModal={openModal} handleCloseModal={handleCloseModal} defaultValue={board?.name} />
            }

            <h2>Board: {board?.name}</h2>
            <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
                <NavLink to="/">My boards</NavLink>
                <div>
                    <Button size="small" onClick={handleOpenList}>Add List</Button>
                    <Button size="small" color="secondary" onClick={openEditModal}>Edit board</Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => handleDeleteBoard(board?.id ?? "")}>Delete board</Button>
                </div>
            </nav>

            {inputList &&
                <form action="" onSubmit={handleAddList}>
                    <TextField name="list" id="standard-basic" label="Standard" variant="standard" />
                    <Button type="submit">Add list</Button>
                </form>
            }
            {/* LISTS */}
            <section className="lists-container">
                {boardLists.map(list => (
                    <Card sx={{ width: 360, margin: '32px 0', height: 'fit-content', flexShrink: 0 }}>
                        <List>
                            <ListItem key={list.id}>
                                {editInput === list.id ?
                                    <form onSubmit={(event) => handleEditList(event, list.id)}>
                                        <TextField defaultValue={list.name} name="list" id="standard-basic" variant="standard" />
                                        <Button type="submit">Edit list</Button>
                                    </form>
                                    :
                                    <ListItemText sx={{ color: 'green' }}>
                                        Lista: {list.name}
                                    </ListItemText>
                                }

                                <ListItemIcon style={{ cursor: 'pointer' }} onClick={() => handleOpenEditList(list.id)}>
                                    <EditOutlinedIcon />
                                </ListItemIcon>
                                <ListItemIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteList(list.id)}>
                                    <DeleteOutlineOutlinedIcon />
                                </ListItemIcon>
                            </ListItem>

                            {cards
                                .filter((card) => list?.cards?.includes(card.id)) // Filtramos las tarjetas que están en la lista
                                .map((card) => (
                                    <List key={card.id}>
                                        <ListItem key={list.id}>
                                            {editCardInput === card.id ?
                                                <form onSubmit={(event) => handleEditCard(event, card.id, list.id)}>
                                                    <TextField defaultValue={card.name} name="card" id="standard-basic" variant="standard" />
                                                    <Button type="submit">Edit card</Button>
                                                </form>
                                                :
                                                <ListItemText>
                                                    Card: {card.name}
                                                </ListItemText>
                                            }

                                            <ListItemIcon style={{ cursor: 'pointer' }} onClick={() => handleOpenEditCard(card.id)}>
                                                <EditOutlinedIcon />
                                            </ListItemIcon>
                                            <ListItemIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteCard(card.id)}>
                                                <DeleteOutlineOutlinedIcon />
                                            </ListItemIcon>
                                        </ListItem>
                                    </List>
                                ))}

                            <Button onClick={() => handleOpenNewCard(list.id)}>Add a card</Button>
                            {openCards === list.id &&
                                <Card sx={{ width: 320, margin: '24px auto', padding: 2, bgcolor: '#1E1E1E' }}>
                                    <button onClick={handleCloseNewCard}>X</button>
                                    <form action="" onSubmit={handleAddCard} data-list-id={list.id}>
                                        <TextField name="card" id="standard-basic" label="Standard" variant="standard" />
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

