import { Card, CardContent } from "@mui/material"
import { ReactNode } from "react"

type CardVariant = "board" | "newBoard" | "list" | "newList" | "cardItem"

interface Props {
    children: ReactNode
    variant?: CardVariant
    classStyle?: string
    handleOnClick?: () => void
    bgColor?: string
}

const variantStyles: Record<CardVariant, object> = {
    board: { bgcolor: "#FFB433", color: "#121212" },
    newBoard: { bgcolor: "#121212" },
    list: {
        width: 360,
        padding: '12px',
        flexShrink: 0,
        overflow: 'hidden',
        height: 'fit-content',
        maxHeight: '90%',
        display: 'flex',
        flexDirection: 'column',
        margin: 0
    },
    newList: { bgcolor: "#585858", width: 360, margin: '0', padding: '12px', height: 'fit-content', flexShrink: 0 },
    cardItem: { width: 320, padding: 1, bgcolor: '#1A1A1A' }

}


export function BaseCard({ children, variant, classStyle, handleOnClick }: Props) {

    return (
        <Card
            className={`base-card ${classStyle}`}
            onClick={handleOnClick}
            sx={{
                ...(variant ? variantStyles[variant] : {}),
                transition: "opacity 0.3s ease-in-out",
                "&:hover": {
                    opacity: 0.7
                }
            }}>
            <CardContent sx={{ margin: 0, padding: '0!important' }}>
                {children}
            </CardContent>
        </Card>
    )
}