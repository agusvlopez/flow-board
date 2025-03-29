export const handleEditEntity = <T extends { id?: string, name: string, relatedId?: string }>(
    event: React.FormEvent<HTMLFormElement>,
    entityId: string,
    actionFunction: (data: T) => void,
    closeFunction: () => void,
    inputName: string,
    extraData?: object
) => {
    event.preventDefault()

    const field = new FormData(event.currentTarget)
    const inputValue = field.get(inputName) as string

    if (!inputValue.trim()) return

    actionFunction({ id: entityId, name: inputValue, ...extraData } as T)
    closeFunction()
};

export const handleAddEntity = <T extends { id: string; name: string, relatedId?: string }>(
    event: React.FormEvent<HTMLFormElement>,
    actionFunction: (data: T) => void,
    closeFunction: () => void,
    inputName: string,
    extraData?: object
) => {
    event.preventDefault();

    const field = new FormData(event.currentTarget)
    const inputValue = field.get(inputName) as string

    if (!inputValue.trim()) return

    actionFunction({ id: crypto.randomUUID(), name: inputValue, ...extraData } as T)
    closeFunction();
};
