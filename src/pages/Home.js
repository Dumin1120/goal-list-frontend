import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

export default function Home() {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/board");
    }, [user, navigate])

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
