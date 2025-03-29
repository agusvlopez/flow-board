import { useDraggable } from "@dnd-kit/core";
import { Card as CardType } from "../types";
import { BaseCard } from "./BaseCard";
import { CardHeader } from "./CardHeader";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface Props {
    card: CardType
}

export function TaskCard({ card }: Props) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: card.id
    })

    const style: React.CSSProperties = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        pointerEvents: isDragging ? 'none' : 'auto'
    }


    return (
        <div
            ref={setNodeRef}
            style={style}
        >
            <BaseCard
                variant="cardItem"
                classStyle="card-item"
            >
                <button
                    {...listeners} {...attributes}
                    style={{
                        width: "fit-content",

                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        justifySelf: "flex-end",
                        borderRadius: "4px"
                    }}
                ><DragIndicatorIcon /></button>
                <CardHeader
                    variant="card"
                    item={card}
                />
            </BaseCard>
        </div>
    )
}