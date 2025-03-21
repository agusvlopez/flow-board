import { useEffect, useState } from "react"
import { useBoardCRUD } from "./useBoardCRUD"
import { Board, List } from "../types"

export function useBoardData(boardId: Board["id"]) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>()
    const [boardData, setBoardData] = useState<Board>()
    const [boardLists, setBoardLists] = useState<List[]>()

    const { boards, lists, cards } = useBoardCRUD()

    const getCardsForList = (listId: List["id"]) => {
        if (!cards) return []
        return cards.filter(card => lists.find(l => l.id === listId)?.cards?.includes(card.id))
    }

    useEffect(() => {
        if (!boards || !lists) {
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
        setBoardLists(lists.filter(l => foundBoard.lists?.includes(l.id)))
        setLoading(false)
    }, [boardId, boards, lists])

    return {
        loading,
        error,
        board: boardData,
        boardLists,
        getCardsForList
    };
}