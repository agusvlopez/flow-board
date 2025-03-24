import { Button, Card, CardActions, CardContent } from "@mui/material";
import { ReactNode, useState } from "react";

type CardVariant = "board" | "newBoard" | "newList" | "card"

interface Props {
    children: ReactNode,
    variant?: CardVariant,
    classStyle?: string
    handleOnClick?: () => void,
    bgColor?: string
}

const variantStyles: Record<CardVariant, object> = {
    board: { bgcolor: "#FFB433", color: "#121212" },
    newBoard: { bgcolor: "#121212" },
    newList: { bgcolor: "#585858", width: 360, margin: '0', padding: '12px', height: 'fit-content', flexShrink: 0 },
    card: { width: 320, padding: 1, bgcolor: '#1A1A1A' }
}


export function BaseCard({ children, variant, classStyle, handleOnClick }: Props) {
    const [isAction, setIsAction] = useState(false)

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
            {isAction &&
                <CardActions>
                    <Button onClick={() => { }}>Add a card</Button>
                </CardActions>
            }
        </Card>
    )
}