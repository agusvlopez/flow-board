import { useState } from "react";
import { List as ListType, Card as CardType } from "../types"

export function useBoardActions() {
    //STATES
    //EDIT BOARD
    const [isOpenEditBoardModal, setIsOpenEditBoardModal] = useState(false)
    //LIST
    const [isInputList, setIsInputList] = useState(false)
    const [editListInput, setEditListInput] = useState("")
    //CARD
    const [inputCard, setInputCard] = useState("");
    const [editCardInput, setEditCardInput] = useState("")

    //FUNCTIONS
    //BOARD
    const openEditBoardModal = () => setIsOpenEditBoardModal(true)
    const closeEditBoardModal = () => setIsOpenEditBoardModal(false)

    //LIST
    const openInputAddList = () => setIsInputList(true)
    const closeInputAddList = () => setIsInputList(false)
    const openInputEditList = (id: ListType["id"]) => setEditListInput(id)
    const closeInputEditList = () => setEditListInput("")

    //CARD
    const openInputAddCard = (listId: ListType["id"]) => setInputCard(listId)
    const closeInputAddCard = () => setInputCard("")
    const openInputEditCard = (id: CardType["id"]) => setEditCardInput(id)
    const closeInputEditCard = () => setEditCardInput("")

    return {
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
    }

}