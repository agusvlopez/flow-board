import { useEffect, useState } from "react"
import { useBoardCRUD } from "./useBoardCRUD"
import { Board, List } from "../types"

export function useBoardData(boardId: Board["id"]) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>()
    const [boardData, setBoardData] = useState<Board>()

    const { boards, lists, cards } = useBoardCRUD()

    const getListsForBoard = (boardId: Board["id"]) => {
        if (!lists) return []
        return lists.filter(list => boards.find(b => b.id === boardId)?.lists?.includes(list.id))
    }

    const getCardsForList = (listId: List["id"]) => {
        if (!cards) return []
        return cards.filter(card => lists.find(l => l.id === listId)?.cards?.includes(card.id))
    }

    useEffect(() => {
        if (!boards) {
            setLoading(true)
            return
        }

        const foundBoard = boards.find(b => b.id === boardId)

        if (!foundBoard) {
            setError("Board not found")
            setLoading(false)
            return
        }

        setBoardData(foundBoard);
        setLoading(false)
    }, [boardId, boards])

    return {
        loading,
        error,
        board: boardData,
        getListsForBoard,
        getCardsForList
    };
}