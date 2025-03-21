
import { Typography } from "@mui/material"
import { Board as BoardType } from "../types"
import { BaseCard } from "./BaseCard"

interface Props {
    board: BoardType
}

export function Board({ board }: Props) {

    return (
        <>
            <BaseCard classStyle="board-card">
                <Typography style={{ textAlign: 'left', fontWeight: 'bold' }}>{board.name}</Typography>
            </BaseCard>
        </>
    )

}