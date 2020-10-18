import React from "react";

import '../styles/components/sidebar-login.css';
import happyimg from "../images/logo-login.svg";

export default function SidebarLogin() {
    return (
        <aside className="sidebar-login">
            <img src={happyimg} alt="Happy"/>
            <div className="region">
                <h1>Goiás</h1>
                <h2>Ceres</h2>
            </div>
        </aside>
    );
}

