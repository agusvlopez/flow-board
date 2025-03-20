
import { Board as BoardType } from "../types"
import { BaseCard } from "./BaseCard"

interface Props {
    board: BoardType
}

export function Board({ board }: Props) {

    return <BaseCard title={board.name} />

}