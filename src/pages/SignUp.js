import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userSignUp } from "../services/firebase";

export default function SignUp() {
    const [info, setInfo] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = info;
        if (!name.trim()) return setErrorMsg("Name can not be empty");
        if (password.length < 6 || password !== confirmPassword)
            return setErrorMsg("Invalid password");

        const error = await userSignUp(name, email, password);
        if (error) return setErrorMsg(error);

        navigate("/");
    }

    const handleGoback = () => {
        navigate("/");
    }

    return (
        <div>
            <h1>SIGNUP HERE</h1>
            <h2>Create your account</h2>
            {errorMsg}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={info.email}
                    onChange={handleChange}
                    required
                /><br />
                <label htmlFor="password">Password (Min 6 chars)</label>
                <input
                    type="password"
                    id="password"
                    value={info.password}
                    onChange={handleChange}
                    required
                /><br />
                <label htmlFor="confirmPassword">
                    Confirm Password {info.confirmPassword && (info.password !== info.confirmPassword) && <span>does not match</span>}
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={info.confirmPassword}
                    onChange={handleChange}
                    required
                /><br />
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={info.name}
                    onChange={handleChange}
                    required
                /><br />
                <button type="submit" hidden>needed for {"<enter>"}</button>
            </form>
            <button onClick={handleGoback}>Go back</button>
            <button onClick={handleSubmit}>Sign up</button>
        </div>
    )
}
