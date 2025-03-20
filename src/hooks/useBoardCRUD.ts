import { useBoardsStore } from "../store/boards"

export function useBoardCRUD() {
    const boards = useBoardsStore(state => state.boards)
    const deleteBoard = useBoardsStore(state => state.deleteBoard)
    const editBoard = useBoardsStore(state => state.editBoard)

    const lists = useBoardsStore(state => state.lists)
    const addList = useBoardsStore(state => state.addList)
    const editList = useBoardsStore(state => state.editList)
    const deleteList = useBoardsStore(state => state.deleteList)

    const cards = useBoardsStore(state => state.cards)
    const addCard = useBoardsStore(state => state.addCard)
    const editCard = useBoardsStore(state => state.editCard)
    const deleteCard = useBoardsStore(state => state.deleteCard)

    return {
        boards,
        deleteBoard,
        editBoard,

        lists,
        addList,
        editList,
        deleteList,

        cards,
        addCard,
        editCard,
        deleteCard
    }
}