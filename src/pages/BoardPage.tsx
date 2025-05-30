import { useParams } from "react-router-dom"
import { Board, Card as CardType } from "../types"
import { useBoardData } from "../hooks/useBoardData"
import { NewListInput } from "../components/NewListInput"
import { BoardHeader } from "../components/BoardHeader"
import { CustomList } from "../components/CustomList"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { useBoardCRUD } from "../hooks/useBoardCRUD"
import { toast, Toaster } from "sonner"

export function BoardPage() {
    const { id } = useParams()

    const { editCard } = useBoardCRUD()

    const {
        loading,
        error,
        board,
        getListsForBoard,
    } = useBoardData(id as Board["id"])

    const lists = getListsForBoard(board?.id as Board["id"])

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        console.log("active", active);

        if (!over) return

        const cardId = active.id as CardType["id"]
        const newStatus = over.id as CardType["listId"]

        toast(`Card moved`)
        editCard({ id: cardId, listId: newStatus })
    }

    if (loading) return <div>Loading board...</div>
    if (error) return <div>Error: {error as string}</div>//todo: check this
    if (!board) return <div>Board not found</div>

    return (
        <>
            <Toaster />
            <BoardHeader board={board} />
            <section className="lists-container">
                <DndContext onDragEnd={handleDragEnd}>
                    {lists.map((list) => (
                        <CustomList key={list.id} list={list} />
                    ))}

                    <div>
                        <NewListInput
                            item={board}
                        />
                    </div>
                </DndContext>
            </section>

        </>
    )
}