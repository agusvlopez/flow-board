export type Board = {
    id: string
    name: string
    lists?: string[]
}

export type List = {
    id: string
    name: string
    boardId: string
    cards: string[]
}

export type Card = {
    id: string,
    name?: string,
    description?: string
    dueDate?: string
    listId: string
}