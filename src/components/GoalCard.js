import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiURL, URL } from "../utils/apiURL";
import axios from "axios";
import "./GoalCard.scss";

export default function GoalCard({
    card_name,
    id,
    uid,
    position,
    share,
    share_edit,
    share_key,
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
    const [showShareLink, setShowShareLink] = useState(!share ? 0 : share_edit ? 2 : 1);
    const btnEdit = useRef(null);
    const shareLinkText = useRef(null);
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

    const handlSharing = async (e) => {
        try {
            const m = Number(e.target.value);
            const card = { id, uid, share: m > 0, share_edit: m > 1 };
            const { data } = await axios.put(`${apiURL}/goalcards/modify`, card);
            if (!data.success) throw data.message;
            setShowShareLink(prev => m);
        } catch (err) {
            console.log(err)
        }
    }

    const copyShareLink = () => {
        navigator.clipboard.writeText(shareLinkText.current.textContent);
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
        <div className="goalcard">
            <div className="goalcard__name-container">
                {editCardId === id
                    ?
                    <div
                        className="goalcard__name"
                    >
                        <form onSubmit={updateCardName}>
                            <input
                                className="goalcard__name-input"
                                ref={btnEdit}
                                value={cardName.curr}
                                onKeyDown={(e) => e.keyCode === 27 && revertCardName()}
                                onChange={(e) => setCardName(prev => ({ ...prev, curr: e.target.value }))}
                            />
                        </form>
                    </div>
                    :
                    <div className="goalcard__name" onClick={() => setEditCardId(prev => id)}>
                        {cardName.curr}
                    </div>
                }
                {editCardId !== id
                    ?
                    <button className="goalcard__del" onClick={deleteCard}>X</button>
                    :
                    <>
                        <button onClick={updateCardName}>🆗</button>
                        <button onClick={revertCardName}>↩️</button>
                    </>
                }
            </div>
            <ul onClick={() => navigate(`/card/${id}`)}>
                <li>
                    {!task_1 ? <span>&nbsp;</span> : `${task_1_completed ? "✅" : "💪"} ${task_1}`}
                </li>
                <li>
                    {!task_2 ? <span>&nbsp;</span> : `${task_2_completed ? "✅" : "💪"} ${task_2}`}
                </li>
                <li>
                    {!task_3 ? <span>&nbsp;</span> : `${task_3_completed ? "✅" : "💪"} ${task_3}`}
                </li>
                <li>
                    {!task_4 ? <span>&nbsp;</span> : `${task_4_completed ? "✅" : "💪"} ${task_4}`}
                </li>
                <li>
                    {!task_5 ? <span>&nbsp;</span> : `${task_5_completed ? "✅" : "💪"} ${task_5}`}
                </li>
            </ul>
            {tasks_total
                ?
                <div className="goalcard__footer">
                    Completed: {tasks_completed}/{tasks_total}
                </div>
                :
                <div className="goalcard__footer">&nbsp;</div>
            }
            <select onChange={handlSharing} defaultValue={showShareLink}>
                <option value={0}>not sharing</option>
                <option value={1}>sharing without edit</option>
                <option value={2}>sharing with edit</option>
            </select>
            {!!showShareLink &&
                <div>
                    <span ref={shareLinkText}>{`${URL}/share/${share_key}`}</span>
                    <button onClick={copyShareLink}>Copy link</button>
                </div>
            }
        </div >
    )
}
