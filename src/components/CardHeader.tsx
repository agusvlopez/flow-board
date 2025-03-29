import { List, ListItem } from "@mui/material";
import { ActionableLabel } from "./ActionableLabel";
import { handleEditEntity } from "../utils/boardForms";
import { Card as CardType, List as ListType } from "../types";
import { ActionsMenu } from "./ActionsMenu";
import { useBoardCRUD } from "../hooks/useBoardCRUD";
import { useBoardActions } from "../hooks/useBoardActions";

interface Props {
    variant: "list" | "card"
    item: ListType | CardType
}


export function CardHeader({ variant, item }: Props) {

    const {
        editListInput,
        openInputEditList,
        closeInputEditList,

        editCardInput,
        openInputEditCard,
        closeInputEditCard

    } = useBoardActions()

    const {
        editList,
        deleteList,

        editCard,
        deleteCard
    } = useBoardCRUD()


    if (variant === "list" && "boardId" in item) return (
        <List>
            <ListItem key={item.id}>
                <ActionableLabel
                    editMode={editListInput === item.id}
                    handleOnSubmit={(event) => handleEditEntity(
                        event,
                        item.id,
                        editList,
                        closeInputEditList,
                        "list-edit",
                        { boardId: item?.boardId }
                    )}
                    defaultValue={item.name ?? ""}
                    labelName="list-edit"
                    labelButton="Edit List"
                    name={item.name ?? ""}
                    handleEdit={() => {
                        openInputEditList(item.id);
                    }}
                />
                <ActionsMenu
                    elementId={item.id}
                    editAction={() => {
                        openInputEditList(item.id);
                    }}
                    deleteAction={() => {
                        deleteList(item.id);
                    }}
                />
            </ListItem>
        </List>
    )

    if (variant === "card" && "listId" in item) return (
        <List>
            <ListItem key={item.id} className="actionable-label--container">
                <ActionableLabel
                    editMode={editCardInput === item.id}
                    handleOnSubmit={(event) => handleEditEntity(
                        event,
                        item.id,
                        editCard,
                        closeInputEditCard,
                        "card-edit",
                        { listId: item?.listId }
                    )}
                    defaultValue={item.name ?? ""}
                    labelName="card-edit"
                    labelButton="Edit Card"
                    name={item.name ?? ""}
                    handleEdit={() => {
                        openInputEditCard(item.id);
                    }}
                />
                <ActionsMenu
                    elementId={item.id}
                    editAction={() => {
                        openInputEditCard(item.id);
                    }}
                    deleteAction={() => {
                        deleteCard(item.id);
                    }}
                />
            </ListItem>
        </List>
    )

}