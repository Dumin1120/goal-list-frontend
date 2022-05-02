import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { userSignOut } from "../services/firebase";

export default function Navbar() {
    const user = useContext(UserContext);

    return (
        <div className='navbar'>
            <h1>NAVBAR HERE</h1>
            <div>
                <Link to="/">Goal List</Link>
            </div>
            <div>&nbsp;</div>
            {user
                ?
                <div>
                    <button onClick={userSignOut}>Log out</button> &emsp;
                    {user.displayName}
                </div>
                :
                <div>
                    <Link to="signup">Sign up</Link> &emsp;
                    <Link to="login">Log in</Link> &emsp;
                    <Link to="demo">Try demo</Link>
                </div>
            }
        </div>
    )
}
