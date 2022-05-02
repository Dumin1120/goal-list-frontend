import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DemoGoalCardDetail({ demoTodosData, removeCard, removeTodo }) {
    const [todos, setTodos] = useState([]);
    const { cardId } = useParams();
    const navigate = useNavigate();

    const handleRemoveCard = () => {
        removeCard(+cardId);
        navigate("/demo", { replace: true });
    }

    useEffect(() => {
        setTodos(demoTodosData.filter(todo => todo.card_id === +cardId));
    }, [demoTodosData, cardId])

    return (
        <div>
            <h1>GOALCARDDETAIL</h1>
            <button onClick={handleRemoveCard}>Remove whole card</button>
            {todos.map(todo =>
                <div key={todo.id}>
                    {todo.to_do} &nbsp; <button onClick={() => removeTodo(todo.id)}>DEL</button>
                </div>
            )}
        </div>
    )
}
