import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { userSignOut } from "../services/firebase";
import "./Navbar.scss";

export default function Navbar() {
    const user = useContext(UserContext);

    return (
        <div className='navbar'>
            <div className="navbar__logo">
                <Link to="/">Goal!</Link>
            </div>
            <nav>
                {user
                    ?
                    <div>
                        <button onClick={userSignOut}>Log out</button>
                        {user.displayName}
                    </div>
                    :
                    <ul>
                        <li>
                            <Link to="demo">Try demo</Link>
                        </li>
                        <li>
                            <Link to="login">Log in</Link>
                        </li>
                        <li>
                            <Link to="signup">Sign up</Link>
                        </li>
                    </ul>
                }
            </nav>
        </div>
    )
}
