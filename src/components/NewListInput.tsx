import { Button, TextField } from "@mui/material"
import { handleAddEntity } from "../utils/boardForms"
import { BaseCard } from "./BaseCard"
import CheckIcon from '@mui/icons-material/Check'
import { useBoardActions } from "../hooks/useBoardActions"
import { useBoardCRUD } from "../hooks/useBoardCRUD"
import { Board as BoardType } from "../types"

interface Props {
    item: BoardType
}

export function NewListInput({ item }: Props) {
    const {
        isInputList,
        openInputAddList,
        closeInputAddList,
    } = useBoardActions()

    const { addList } = useBoardCRUD()

    return (
        <>
            {isInputList &&
                <BaseCard variant="newList">
                    <form onSubmit={(event) => {
                        handleAddEntity(
                            event,
                            addList,
                            closeInputAddList,
                            "list-new",
                            { boardId: item?.id }
                        )
                        closeInputAddList()
                    }}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <TextField
                            name="list-new"
                            id="list-new"
                            variant="standard"
                            placeholder="New List"
                            autoFocus
                        />
                        <Button
                            sx={{ width: 'fit-content' }}
                            type="submit"
                            aria-label="Confirm"
                        ><CheckIcon /></Button>
                    </form>
                </BaseCard>
            }
            {!isInputList &&
                <Button
                    size="small"
                    onClick={openInputAddList}
                    sx={{ height: 'fit-content', margin: '0', padding: 0 }}
                >
                    <BaseCard variant="newList">
                        Add List +
                    </BaseCard>
                </Button>
            }
        </>
    )
}