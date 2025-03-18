import { create } from "zustand";
import { Board } from "../types";
import { persist } from "zustand/middleware";

interface State {
    boards: Board[],
    createBoard: (board: Board) => void,
    deleteBoard: (id: Board["id"]) => void,
    editBoard: (board: Board) => void
}

export const useBoardsStore = create<State>()(persist((set, get) => {
    return {
        boards: [],
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
        }
    }
}, {
    name: 'boards'
}))