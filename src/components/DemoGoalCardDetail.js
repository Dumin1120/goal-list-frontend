import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DemoTodoDetail from "./DemoTodoDetail";

export default function DemoGoalCardDetail({ demoTodosData, addTodo, editTodo, removeCard, removeTodo }) {
    const [todos, setTodos] = useState([]);
    const [todoDesc, setTodoDesc] = useState("");
    const [showInputBox, setShowInputBox] = useState(false);
    const { cardId } = useParams();
    const navigate = useNavigate();
    const buttonCreate = useRef(null);

    const handleRemoveCard = () => {
        removeCard(+cardId);
        navigate("/demo", { replace: true });
    }

    const handleChange = (e) => {
        setTodoDesc(prev => e.target.value);
    }

    const handleCancel = () => {
        setShowInputBox(prev => !prev);
        setTodoDesc(prev => "");
    }

    const handleCreate = (e) => {
        e.preventDefault();
        addTodo(+cardId, todoDesc);
        handleCancel();
    }

    useEffect(() => {
        setTodos(demoTodosData.filter(todo => todo.card_id === +cardId));
    }, [demoTodosData, cardId])

    useEffect(() => {
        buttonCreate?.current?.focus();
    }, [showInputBox])

    return (
        <div>
            <h1>GOALCARDDETAIL</h1>
            <button onClick={handleRemoveCard}>Remove whole card</button><br />
            {showInputBox
                ?
                <div>
                    <form onSubmit={handleCreate}>
                        <label>to do description:
                            <input ref={buttonCreate} value={todoDesc} onChange={handleChange} /><br />
                        </label>
                    </form>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleCreate}>Create</button>
                </div>
                :
                <button onClick={() => setShowInputBox(prev => !prev)}>Add new todo</button>
            }
            {todos.map(t => <DemoTodoDetail
                key={t.id}
                editTodo={editTodo}
                removeTodo={removeTodo}
                {...t}
            />)}
        </div>
    )
}
