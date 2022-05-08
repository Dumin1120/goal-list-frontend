import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userSignUp } from "../services/firebase";
import "./UserSignUp.scss";

export default function UserSignUp() {
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

        navigate("/", { replace: true });
    }

    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <h2>Create your account</h2>
                <label htmlFor="name">Name</label>
                <input
                    className="signup__input-box"
                    type="text"
                    id="name"
                    value={info.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    className="signup__input-box"
                    type="email"
                    id="email"
                    value={info.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Password (Min 6 chars)</label>
                <input
                    className="signup__input-box"
                    type="password"
                    id="password"
                    value={info.password}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="confirmPassword">
                    Confirm password {info.confirmPassword && (info.password !== info.confirmPassword) && <span>does not match</span>}
                </label>
                <input
                    className="signup__input-box"
                    type="password"
                    id="confirmPassword"
                    value={info.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit" hidden>needed for {"<enter>"}</button>
            </form>
            <div>
                {errorMsg || <span>&nbsp;</span>}
            </div>
            <div>
                <button className="signup__btn-cancel" onClick={() => navigate("/")}>Cancel</button>
                <button className="signup__btn-submit" onClick={handleSubmit}>Sign up</button>
            </div>
        </div>
    )
}
