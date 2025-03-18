import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { Board as BoardType } from "../types"
import { useBoardsStore } from "../store/boards"

export function Board(board: BoardType) {
    const deleteBoard = useBoardsStore(state => state.deleteBoard)

    return (
        <Card sx={{ width: 275 }}>
            <CardContent>
                <Typography variant="h4" component="h3" gutterBottom>
                    {board.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="secondary" onClick={() => { }}>Edit board</Button>
                <Button size="small" variant="outlined" color="error" onClick={() => deleteBoard(board.id)}>Delete board</Button>
            </CardActions>
        </Card >
    )
}