import { Button, TextField } from "@mui/material"
import { useBoardActions } from "../hooks/useBoardActions"
import { handleAddEntity } from "../utils/boardForms"
import { List as ListType } from "../types"
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { useBoardCRUD } from "../hooks/useBoardCRUD"

interface Props {
    item: ListType
}

export function NewCardInput({ item }: Props) {
    const {
        inputCard,
        openInputAddCard,
        closeInputAddCard
    } = useBoardActions()

    const {
        addCard
    } = useBoardCRUD()

    return (
        <div>
            {inputCard !== item.id &&
                <Button onClick={() => {
                    openInputAddCard(item.id)
                }}
                    sx={{ height: 'fit-content', margin: '0', padding: 0 }}
                >
                    + Add a card
                </Button>
            }
            {inputCard === item.id &&
                <form onSubmit={(event) =>
                    handleAddEntity(event, addCard, closeInputAddCard, "card-new", { listId: item.id })
                }
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    <TextField
                        name="card-new"
                        id="card-new"
                        variant="standard"
                        placeholder="New Card"
                        autoFocus
                    />
                    <Button
                        sx={{ width: 'fit-content' }}
                        type="submit"
                        aria-label="Confirm"
                    ><CheckIcon /></Button>
                    <Button
                        onClick={closeInputAddCard}
                        sx={{ width: 'fit-content' }}
                        type="submit"
                        aria-label="Close"
                    ><CloseIcon /></Button>
                </form>
            }
        </div>
    )
}