import { useState } from "react";
import { List as ListType, Card as CardType } from "../types"

export function useBoardActions() {
    //STATES
    //BOARD
    const [isOpenBoardModal, setIsOpenBoardModal] = useState(false);
    const [isOpenDeleteBoardModal, setIsOpenDeleteBoardModal] = useState(false);
    const [isOpenEditBoardModal, setIsOpenEditBoardModal] = useState(false)
    //LIST
    const [isInputList, setIsInputList] = useState(false)
    const [editListInput, setEditListInput] = useState("")
    //CARD
    const [inputCard, setInputCard] = useState("");
    const [editCardInput, setEditCardInput] = useState("")

    //FUNCTIONS
    //BOARD
    const openBoardModal = () => setIsOpenBoardModal(true);
    const closeBoardModal = () => setIsOpenBoardModal(false);
    const openDeleteBoardModal = () => setIsOpenDeleteBoardModal(true)
    const closeDeleteBoardModal = () => setIsOpenDeleteBoardModal(false)
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
        isOpenBoardModal,
        openBoardModal,
        closeBoardModal,
        isOpenEditBoardModal,
        openEditBoardModal,
        closeEditBoardModal,
        isOpenDeleteBoardModal,
        openDeleteBoardModal,
        closeDeleteBoardModal,

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