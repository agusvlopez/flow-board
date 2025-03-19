//Estructura normalizada

export type Board = {
    id: string
    name: string
    lists?: string[] //ids de las listas
}

export type List = {
    id: string
    name: string
    cards?: string[] //ids de las cards
}

export type Card = {
    id: string,
    name: string,
    description?: string
    dueDate?: string
    listId: string //id conectado a list
}