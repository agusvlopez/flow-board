import { create } from "zustand";
import { Board } from "../types";
import { persist } from "zustand/middleware";

interface State {
    boards: Board[],
    createBoard: (board: Board) => void,
    deleteBoard: (id: Board["id"]) => void
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

        deleteBoard: (id: Board["id"]) => {
            const { boards } = get()
            const newBoards = structuredClone(boards)

            const filteredBoards = newBoards.filter((board) => {
                return board.id !== id
            })
            console.log("filteredBoards", filteredBoards);

            set({ boards: filteredBoards })
        }
    }
}, {
    name: 'boards'
}))