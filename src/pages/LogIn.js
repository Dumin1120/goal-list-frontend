import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userSignIn, userSignInWithProvider } from "../services/firebase";

export default function LogIn() {
    const [info, setInfo] = useState({ email: "", password: "", errorMsg: "" });
    const [sendingForm, setSendingForm] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSendingForm(prev => true);
        const { email, password } = info;
        const error = await userSignIn(email, password);
        if (error) {
            setSendingForm(prev => false);
            return setInfo({ ...info, errorMsg: error });
        }

        navigate("/");
    }

    const handleProviderLogin = async (providerName) => {
        const error = await userSignInWithProvider(providerName);
        if (error) return setInfo({ ...info, errorMsg: error });

        navigate("/");
    }

    return (
        <div>
            <h1>LOGIN IN HERE</h1>
            <h2>Welcome back!</h2>
            <h3>Log in to your account</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={info.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={info.password}
                    onChange={handleChange}
                    required
                />
                {sendingForm
                    ? <input type="submit" value="Please wait..." disabled />
                    : <input type="submit" value="Continue" />
                }
            </form>
            <button onClick={() => handleProviderLogin("google")}>Continue with Google</button>
            <button onClick={() => handleProviderLogin("github")}>Continue with Github</button>
            {info.errorMsg}
        </div>
    )
}
