import { ReactNode } from "react";
import { Menu } from "../components/Menu";

interface Props {
    children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <aside className="sidebar">
                <Menu />
            </aside>

            {/* Main content */}
            <main style={{ flex: 1, padding: "20px" }}>
                {children}
            </main>
        </div>
    );
}
