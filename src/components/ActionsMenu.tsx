import { Button, Menu, MenuItem } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useState } from "react"

interface Props {
    elementId: string
    editAction: () => void
    deleteAction: () => void
}

export function ActionsMenu({ elementId, editAction, deleteAction }: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleEdit = () => {
        editAction()
        handleClose()
    }

    const handleDelete = () => {
        deleteAction()
        handleClose()
    }

    return (
        <div>
            <Button
                aria-controls={elementId ? `${elementId}-positioned-menu` : undefined}
                aria-haspopup="true"
                aria-expanded={elementId ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreHorizIcon />
            </Button>
            <Menu
                id={`${elementId}-positioned-menu`}
                aria-labelledby={elementId}
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </div>
    )
}