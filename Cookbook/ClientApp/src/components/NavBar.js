import { NavLink } from "react-router-dom"
import "../assets/style.css";

export default function NavBar() {

    return(
        <div>
            <div className="anqi">
                <img id="logo" src="/logo.png"  alt="logo" />
             </div>
            <ul >
                <li className="nav">
                    <NavLink to="/search">Generate your meals</NavLink>
                </li>
                <li className="nav">
                    <NavLink to="/dishes">See All Dishes</NavLink>
                </li>
                <li className="nav">
                    <NavLink to="/create-dish">Create a Dish</NavLink>
                </li>
                <li className="nav">
                    <NavLink to="/create-label">Create a Label</NavLink>
                </li>
            </ul>
        </div>);
}
