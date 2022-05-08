import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../utils/apiURL";
import axios from "axios";
import "./GoalCard.scss";

export default function GoalCard({
    card_name,
    id,
    uid,
    tasks_completed,
    tasks_total,
    task_1,
    task_1_completed,
    task_2,
    task_2_completed,
    task_3,
    task_3_completed,
    task_4,
    task_4_completed,
    task_5,
    task_5_completed,
    editCardId,
    setEditCardId,
    getAllCards }) {
    const [cardName, setCardName] = useState({ prev: card_name, curr: card_name });
    const btnEdit = useRef(null);
    const navigate = useNavigate();

    const updateCardName = async (e) => {
        e.preventDefault();
        try {
            const card = { tasks_total, id, uid, card_name: cardName.curr };
            const { data } = await axios.put(`${apiURL}/goalcards/modify`, card);
            if (!data.success) throw data.message;
            const { curr } = cardName;
            setCardName({ prev: curr, curr });
            setEditCardId(-1);
        } catch (err) {
            console.log(err);
        }
    }

    const revertCardName = () => {
        const { prev } = cardName;
        setCardName({ prev, curr: prev });
        setEditCardId(-1);
    }

    const deleteCard = async () => {
        try {
            const card = { data: { id, uid } };
            const { data } = await axios.delete(`${apiURL}/goalcards/modify`, card);
            if (!data.success) throw data.message;
            getAllCards();
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const { prev, curr } = cardName;
        if (prev !== curr) {
            setCardName({ prev, curr: prev });
        }
        btnEdit?.current?.focus();
        // eslint-disable-next-line
    }, [editCardId])

    return (
        <div>
            <div>
                {editCardId === id
                    ?
                    <div>
                        <form onSubmit={updateCardName}>
                            <input
                                ref={btnEdit}
                                value={cardName.curr}
                                onChange={(e) => setCardName(prev => ({ ...prev, curr: e.target.value }))}
                            />
                        </form>
                        <button onClick={updateCardName}>Submit</button>
                        <button onClick={revertCardName}>Cancel</button>
                    </div>
                    :
                    <h2 onClick={() => setEditCardId(prev => id)}>
                        {cardName.curr}
                    </h2>
                }
                <button onClick={deleteCard}>
                    DEL
                </button>
            </div>
            <ul onClick={() => navigate(`/card/${id}`)}>
                <li>
                    {task_1} {task_1_completed && "DONE"}
                </li>
                <li>
                    {task_2} {task_2_completed && "DONE"}
                </li>
                <li>
                    {task_3} {task_3_completed && "DONE"}
                </li>
                <li>
                    {task_4} {task_4_completed && "DONE"}
                </li>
                <li>
                    {task_5} {task_5_completed && "DONE"}
                </li>
            </ul>
            {!!tasks_total &&
                <div>
                    Completed: {tasks_completed}/{tasks_total}
                </div>
            }
        </div>
    )
}
