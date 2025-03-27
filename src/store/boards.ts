import { create } from "zustand";
import { Board, Card, List } from "../types";
import { persist } from "zustand/middleware";

interface State {
    boards: Board[]
    createBoard: (board: Board) => void
    deleteBoard: (id: Board["id"]) => void
    editBoard: (board: Board) => void

    lists: List[],
    addList: (list: List) => void
    deleteList: (id: List["id"]) => void
    editList: (list: List) => void

    cards: Card[],
    addCard: (card: Card) => void
    deleteCard: (id: Card["id"]) => void
    editCard: (card: Card) => void
}

export const useBoardsStore = create<State>()(persist((set, get) => {
    return {
        boards: [],
        lists: [],
        cards: [],
        boardsQuantity: 0,


        createBoard: (board: Board) => {
            const { boards } = get()
            const newBoards = structuredClone(boards)

            set({ boards: [...newBoards, board] })
        },

        editBoard: ({ id, name }: Board) => {
            const { boards } = get()
            const newBoards = structuredClone(boards)

            const boardIndex = newBoards.findIndex(b => b.id === id)
            const boardInfo = newBoards[boardIndex]
            newBoards[boardIndex] = {
                ...boardInfo,
                name
            }

            set({ boards: newBoards })
        },

        deleteBoard: (id: Board["id"]) => {
            const { boards } = get()
            const newBoards = structuredClone(boards)

            const filteredBoards = newBoards.filter((board) => {
                return board.id !== id
            })

            set({ boards: filteredBoards })
        },

        addList: (list: List) => {
            const { boards } = get()
            const newBoards = structuredClone(boards)

            const boardIndex = newBoards.findIndex(q => q.id === list.boardId)
            newBoards[boardIndex].lists = [...(newBoards[boardIndex].lists || []), list.id]

            const { lists } = get()
            const newLists = structuredClone(lists)

            set({ lists: [...newLists, list], boards: newBoards })
        },

        editList: ({ id, name }: List) => {
            const { lists } = get()
            const newLists = structuredClone(lists)

            const listIndex = newLists.findIndex(l => l.id === id)
            const listInfo = newLists[listIndex]
            newLists[listIndex] = {
                ...listInfo,
                name
            }

            set({ lists: newLists })
        },

        deleteList: (id: List["id"]) => {
            const { lists } = get()
            const newLists = structuredClone(lists)

            const filteredLists = newLists.filter((list) => {
                return list.id !== id
            })

            set({ lists: filteredLists })
        },

        addCard: (card: Card) => {
            const { lists } = get()
            const newLists = structuredClone(lists)

            const listIndex = newLists.findIndex(l => l.id === card.listId)
            newLists[listIndex].cards = [...(newLists[listIndex].cards || []), card.id]

            const { cards } = get()
            const newCards = structuredClone(cards)

            set({ cards: [...newCards, card], lists: newLists })
        },

        editCard: ({ id, name }: Card) => {
            const { cards } = get()
            const newCards = structuredClone(cards)

            const cardIndex = newCards.findIndex(c => c.id === id)
            const cardInfo = newCards[cardIndex]
            newCards[cardIndex] = {
                ...cardInfo,
                name
            }

            set({ cards: newCards })
        },

        deleteCard: (id: Card["id"]) => {
            const { cards } = get()
            const newCards = structuredClone(cards)

            const filteredCards = newCards.filter((card) => {
                return card.id !== id
            })

            set({ cards: filteredCards })
        }
    }
}, {
    name: 'boards'
}))