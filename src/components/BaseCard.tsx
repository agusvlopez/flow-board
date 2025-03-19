import { Card, CardContent, Typography } from "@mui/material";

interface Props {
    title: string
}

export function BaseCard({ title }: Props) {
    return (
        <Card sx={{ width: 275 }}>
            <CardContent>
                <Typography variant="h4" component="h3" gutterBottom>
                    {title}
                </Typography>
            </CardContent>
        </Card>
    )
}