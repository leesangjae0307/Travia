import { Bell, Heart, User } from "lucide-react"
import "../styles/Navbar.css"

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-logo">TravelGuide</div>
            <div className="navbar-icons">
                <button className="navbar-icon-button">
                    <Bell />
                </button>
                <button className="navbar-icon-button">
                    <Heart />
                </button>
                <button className="navbar-icon-button">
                    <User />
                </button>
            </div>
        </header>
    )
}
