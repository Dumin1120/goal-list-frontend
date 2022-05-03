import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DemoTodoDetail from "./DemoTodoDetail";

export default function DemoGoalCardDetail({ demoCardsData, demoTodosData, addTodo, editCard, editTodo, removeCard, removeTodo }) {
    const [cardData, setCardData] = useState({});
    const [cardName, setCardName] = useState("");
    const [todos, setTodos] = useState([]);
    const [todoDesc, setTodoDesc] = useState("");
    const [showInputBox, setShowInputBox] = useState(false);
    const [showEditBox, setShowEditBox] = useState(false);
    const { cardId } = useParams();
    const navigate = useNavigate();
    const buttonEdit = useRef(null);
    const buttonCreate = useRef(null);

    const handleCardChange = (e) => {
        setCardName(prev => e.target.value);
    }

    const handleCardCancel = () => {
        setShowEditBox(prev => !prev);
        setCardName(prev => cardData?.card_name || "");
    }

    const handleCardSubmit = (e) => {
        e.preventDefault();
        editCard(+cardId, cardName);
        setShowEditBox(prev => !prev);
    }

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
        setTodos(prev => demoTodosData.filter(t => t.card_id === +cardId));
        const found = demoCardsData.find(c => c.id === +cardId);
        setCardData(prev => found || {});
        setCardName(prev => found?.card_name || "");
    }, [demoTodosData, cardId, demoCardsData])

    useEffect(() => {
        buttonEdit?.current?.focus();
    }, [showEditBox])

    useEffect(() => {
        buttonCreate?.current?.focus();
    }, [showInputBox])

    return (
        <div>
            {showEditBox
                ?
                <div>
                    <form onSubmit={handleCardSubmit}>
                        <label>Card name:
                            <input ref={buttonEdit} value={cardName} onChange={handleCardChange} /><br />
                        </label>
                    </form>
                    <button onClick={handleCardCancel}>Cancel</button>
                    <button onClick={handleCardSubmit}>Update</button>
                </div>
                :
                <div>
                    <h1>{cardData?.card_name}</h1>
                    <button onClick={() => setShowEditBox(prev => !prev)}>Update card name</button>
                    <button onClick={handleRemoveCard}>Remove whole card</button><br />
                </div>
            }
            {showInputBox
                ?
                <div>
                    <form onSubmit={handleCreate}>
                        <label>to-do description:
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
