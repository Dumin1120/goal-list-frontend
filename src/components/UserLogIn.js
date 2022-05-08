import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userSignIn, userSignInWithProvider } from "../services/firebase";
import "./UserLogIn.scss";

export default function UserLogIn() {
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

        navigate("/", { replace: true });
    }

    const handleProviderLogin = async (providerName) => {
        const error = await userSignInWithProvider(providerName);
        if (error) return setInfo({ ...info, errorMsg: error });

        navigate("/", { replace: true });
    }

    return (
        <div className="login">
            <h1>Welcome back!</h1>
            <form onSubmit={handleSubmit}>
                <h2>Log in to Goal!</h2>
                <label htmlFor="email">Email</label>
                <input
                    className="login__input-box"
                    type="email"
                    id="email"
                    value={info.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    className="login__input-box"
                    type="password"
                    id="password"
                    value={info.password}
                    onChange={handleChange}
                    required
                />
                {info.errorMsg}
                {sendingForm
                    ? <button className="login__btn-submit" type="submit" disabled>Logging in...</button>
                    : <button className="login__btn-submit" type="submit">Continue</button>
                }
            </form>
            <div className="login__divider">
                <hr />
                &emsp;OR&emsp;
                <hr />
            </div>
            <button className="login__btn-google" onClick={() => handleProviderLogin("google")}>Continue with Google</button>
            <button className="login__btn-github" onClick={() => handleProviderLogin("github")}>Continue with Github</button>
        </div>
    )
}
