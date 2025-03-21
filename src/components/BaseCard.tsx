import { Card } from "@mui/material";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
    classStyle?: string
    handleOnClick?: () => void
}

export function BaseCard({ children, classStyle, handleOnClick }: Props) {
    return (
        <Card className={`base-card ${classStyle}`} onClick={handleOnClick}>
            {children}
        </Card>
    )
}