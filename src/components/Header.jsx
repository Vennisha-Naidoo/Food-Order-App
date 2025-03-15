import logo from "../assets/logo.jpg";
import Button from "./UI/Button";

export default function Header() {
    return <header id="main-header">
        <div id="title">
            <img src={ logo } alt="Restaurant" />
            <h1>Any Craving Foods</h1>
        </div>
        <nav>
            <Button textOnly>Cart (0)</Button>
        </nav>
    </header>
}