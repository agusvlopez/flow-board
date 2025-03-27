import { useParams } from "react-router-dom"
import { CardActions, CardContent } from "@mui/material"
import { Board } from "../types"
import { useBoardData } from "../hooks/useBoardData"
import { BaseCard } from "../components/BaseCard"
import { CardHeader } from "../components/CardHeader"
import { NewCardInput } from "../components/NewCardInput"
import { NewListInput } from "../components/NewListInput"
import { BoardHeader } from "../components/BoardHeader"

export function BoardPage() {
    const { id } = useParams()

    const {
        loading,
        error,
        board,
        getListsForBoard,
        getCardsForList
    } = useBoardData(id as Board["id"])

    if (loading) return <div>Loading board...</div>
    if (error) return <div>Error: {error as string}</div>//todo: check this
    if (!board) return <div>Board not found</div>

    return (
        <>
            <BoardHeader board={board} />
            {/* LISTS */}
            <section className="lists-container" style={{ height: '75vh' }}>
                {getListsForBoard(board.id).map((list) => (
                    <BaseCard
                        key={list.id}
                        variant="list"
                    >
                        <CardContent sx={{
                            margin: 0,
                            padding: 0,
                            paddingRight: 2,
                            maxHeight: '80%',
                            overflowY: 'auto',
                            width: 340,
                            flexGrow: 1,
                        }}>

                            <CardHeader
                                variant="list"
                                item={list}
                            />
                            <CardContent sx={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {getCardsForList(list.id).map((card) => (
                                    <BaseCard
                                        variant="cardItem"
                                        classStyle="card-item"
                                        key={card.id}
                                    >
                                        <CardHeader
                                            variant="card"
                                            item={card}
                                            listId={list.id}
                                        />
                                    </BaseCard>
                                ))}
                            </CardContent>
                        </CardContent>

                        <CardActions
                            sx={{
                                flexShrink: 0,
                                marginTop: 'auto',
                                padding: '8px',
                            }}
                        >
                            <NewCardInput
                                item={list}
                            />
                        </CardActions>
                    </BaseCard>
                ))}
                <div>
                    <NewListInput
                        item={board}
                    />
                </div>
            </section>
        </>
    )
}