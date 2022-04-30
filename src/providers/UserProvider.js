import { useEffect, useState, createContext } from "react";
import { auth } from "../services/Firebase";

export const UserContext = createContext(null);

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (!user) return setUser(null);

            while (!user.displayName) {
                await user.reload();
            }
            setUser(user);
        });
    }, []);

    return (
        <UserContext.Provider value={user}>
            <div>{props.children}</div>
        </UserContext.Provider>
    );
};
