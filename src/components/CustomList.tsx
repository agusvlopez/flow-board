import { List as ListType } from "../types"
import { CardHeader } from "./CardHeader"
import { NewCardInput } from "./NewCardInput"
import { useBoardCRUD } from "../hooks/useBoardCRUD"
import { TaskCard } from "./TaskCard"
import { useDroppable } from "@dnd-kit/core"

interface Props {
    list: ListType
}

export function CustomList({ list }: Props) {
    const { setNodeRef } = useDroppable({
        id: list.id
    })
    const { cards } = useBoardCRUD()

    const listCards = cards.filter(card => card.listId === list.id)

    return (
        <div
            style={{
                width: 360,
                flexShrink: 0,
                background: '#1A1A1A',
                height: 'fit-content',
            }}
        >
            <div>
                <CardHeader
                    variant="list"
                    item={list}
                />
                <div
                    ref={setNodeRef}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        minHeight: '20px'
                    }}
                >
                    {listCards.map((card) => (
                        <TaskCard
                            key={card.id}
                            card={card} />
                    ))}
                </div>
            </div>

            <div style={{ padding: '20px' }}>
                <NewCardInput item={list} />
            </div>
        </div>
    )
}