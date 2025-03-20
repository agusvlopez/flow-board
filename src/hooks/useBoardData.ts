import { useEffect, useState } from "react";
import { useBoardCRUD } from "./useBoardCRUD";
import { Board, List } from "../types";

export function useBoardData(boardId: Board["id"]) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>();
    const [boardData, setBoardData] = useState<Board>();
    const [boardLists, setBoardLists] = useState<List[]>();

    const { boards, lists, cards } = useBoardCRUD();

    useEffect(() => {
        if (!boards || !lists) {
            setLoading(true);
            return;
        }

        try {
            // Find the board
            const foundBoard = boards.find(b => b.id === boardId);

            if (!foundBoard) {
                setError("Board not found'");
                setLoading(false);
                return;
            }

            // Get the lists for this board
            const boardListsData = lists.filter(l => foundBoard.lists?.includes(l.id));
            console.log("boardListsData", boardListsData);

            // Set the data
            setBoardData(foundBoard);
            setBoardLists(boardListsData);
            setLoading(false);
        } catch (err) {
            if (err) setError(err);
            setLoading(false);
        }
    }, [boardId, boards, lists]);

    // Get cards for a specific list
    const getCardsForList = (listId: List["id"]) => {
        if (!cards) return [];
        return cards.filter(card => lists.find(l => l.id === listId)?.cards?.includes(card.id));
    };

    return {
        loading,
        error,
        board: boardData,
        boardLists,
        getCardsForList
    };
}