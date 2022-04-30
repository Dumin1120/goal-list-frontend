import { useContext, useState } from 'react';
import { UserContext } from "../providers/UserProvider";
import { userSignIn, userSignUp } from "../services/Firebase";


export default function TestUser() {
    const [userInfo, setUserInfo] = useState({ name: "Tester", email: "", password: "", newAcc: false })
    const user = useContext(UserContext);

    const handleInfoChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
    }

    const handleInfoSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, newAcc } = userInfo;
        let result = null;
        if (newAcc) {
            result = await userSignUp(name, email, password);
            console.log(result)
            console.log(user, "NEW ACCOUNT RESULT")
        } else {
            result = await userSignIn(email, password);
            console.log(result)
            console.log(user, "OLD ACCOUNT SIGN IN RESULT")
        }
    }

    return (
        <div>
            TestUser
            <h1>
                {user ? (user.displayName + " has signed in!!!") : "user is currently null"}
            </h1>
            <form onSubmit={handleInfoSubmit}>
                <label htmlFor="name">name</label>
                <input
                    type="text"
                    id="name"
                    value={userInfo.name}
                    onChange={handleInfoChange}
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={userInfo.email}
                    onChange={handleInfoChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={userInfo.password}
                    onChange={handleInfoChange}
                    required
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
