import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>HOME HERE</h1>
            <div>Track your goal and to-do!</div>
            <div>
                <Link to="/signup">Let's get started {">"}</Link> &emsp;
                <Link to="/demo">Try demo</Link>
            </div>
        </div>
    )
}
