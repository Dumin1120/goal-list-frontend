import { Link } from "react-router-dom";

export default function DemoGoalCard({ id, card_name, removeCard }) {

    return (
        <div>
            <h2>GOALCARD HERE</h2>
            <Link to={`${id}`}>{card_name}</Link>
            <button onClick={() => removeCard(id)}>REMOVE</button>
        </div>
    )
}
