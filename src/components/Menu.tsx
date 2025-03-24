import { NavLink } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Avatar } from "@mui/material";

export function Menu() {
    console.log("render ");

    return (
        <div>
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: 10 }}>
                <NavLink
                    to=""
                    style={{
                        color: '#FBF8EF',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'none',
                        lineHeight: 'normal',
                        borderBottom: '1px solid gray',
                        width: '100%',
                        paddingBottom: '12px'
                    }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    Profile Name
                </NavLink>
                <NavLink
                    to="/"
                    style={{
                        color: '#FBF8EF',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'none',
                        lineHeight: 'normal',
                        padding: '12px 0'
                    }}>
                    <DashboardIcon />
                    Boards
                </NavLink>
            </nav>
        </div>
    )
}