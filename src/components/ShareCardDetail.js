import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../utils/apiURL";
import axios from "axios";
import ShareTask from "./ShareTask";

export default function ShareCardDetail() {
    const { share_key } = useParams();
    const [cardTasks, setCardTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editTaskId, setEditTaskId] = useState(-1);
    const [cardName, setCardName] = useState({ prev: "", curr: "" });
    const [cardInfo, setCardInfo] = useState({});
    const btnEdit = useRef(null);

    const getShareCardTasks = useCallback(async () => {
        try {
            let card = { share_key };
            const { data } = await axios.get(`${apiURL}/share/tasks/${share_key}`, card);
            if (!data.success) throw data.message;
            if (data.payload.length === 0) {
                const { data: cardData } = await axios.get(`${apiURL}/share/card/${share_key}`, card);
                if (!cardData.success) throw cardData.message;
                const { card_name } = cardData.payload;
                setCardName({ prev: card_name, curr: card_name });
                return setCardInfo(prev => cardData.payload);
            }
            const { card_name: cardName } = data.payload[0];
            setCardName({ prev: cardName, curr: cardName });
            setCardInfo(prev => data.payload[0]);
            setCardTasks(prev => data.payload);
        } catch (err) {
            console.warn(err);
        }
    }, [share_key])

    const createShareTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        try {
            const position = 1 + cardTasks.reduce((a, b) => a < b.position ? b.position : a, 0);
            const task = { ...cardInfo, card_name: cardName.prev, task: newTask, position };
            const { data } = await axios.post(`${apiURL}/share/tasks`, task);
            if (!data.success) throw data.message;
            setNewTask(prev => "");
            getShareCardTasks();
        } catch (err) {
            console.warn(err);
        }
    }

    const updateCardName = async (e) => {
        e.preventDefault();
        try {
            const card = { ...cardInfo, id: cardInfo.card_id, card_name: cardName.curr };
            console.log(card)
            const { data } = await axios.put(`${apiURL}/share/card`, card);
            if (!data.success) throw data.message;
            const { curr } = cardName;
            setCardName({ prev: curr, curr });
            setEditTaskId(-1);
        } catch (err) {
            console.log(err);
        }
    }

    const revertCardName = () => {
        const { prev } = cardName;
        setCardName({ prev, curr: prev });
        setEditTaskId(-1);
    }

    useEffect(() => {
        getShareCardTasks();
    }, [getShareCardTasks])

    useEffect(() => {
        const { prev, curr } = cardName;
        if (prev !== curr) {
            setCardName({ prev, curr: prev });
        }
        btnEdit?.current?.focus();
        // eslint-disable-next-line
    }, [editTaskId])

    return (
        <div>
            <div>
                {editTaskId === 0
                    ?
                    <div>
                        <form onSubmit={updateCardName}>
                            <input
                                ref={btnEdit}
                                value={cardName.curr}
                                onKeyDown={(e) => e.keyCode === 27 && revertCardName()}
                                onChange={(e) => setCardName(prev => ({ ...prev, curr: e.target.value }))}
                            />
                        </form>
                    </div>
                    :
                    <div onClick={() => setEditTaskId(prev => 0)}>
                        {cardName.curr}
                    </div>
                }
                {editTaskId === 0 &&
                    <>
                        <button onClick={updateCardName}>🆗</button>
                        <button onClick={revertCardName}>↩️</button>
                    </>
                }
            </div>
            <form onSubmit={createShareTask}>
                <input
                    type="text"
                    id="card_name"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
            </form>
            {cardTasks.map(task =>
                <ShareTask
                    key={task.id}
                    editTaskId={editTaskId}
                    setEditTaskId={setEditTaskId}
                    getShareCardTasks={getShareCardTasks}
                    {...task}
                />
            )}
            {!cardName.curr
                ?
                <div>
                    This card is private!
                </div>
                :
                (!cardTasks.length &&
                    <div>
                        There is no task yet, please add one!
                    </div>
                )
            }
        </div>
    )
}
