import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { apiURL } from "../utils/apiURL";
import axios from "axios";
import Task from "./Task";

export default function GoalCardDetail() {
    const user = useContext(UserContext);
    const { cardId } = useParams();
    const navigate = useNavigate();
    const [cardTasks, setCardTasks] = useState([]);
    const [cardInfo, setCardInfo] = useState({});
    const [cardName, setCardName] = useState({ prev: "", curr: "" });
    const [newTask, setNewTask] = useState("");
    const [editTaskId, setEditTaskId] = useState(-1);
    const btnEdit = useRef(null);

    const getCardTasks = useCallback(async () => {
        try {
            let card = { card_id: +cardId, uid: user?.uid };
            const { data } = await axios.post(`${apiURL}/tasks`, card);
            if (!data.success) throw data.message;
            if (data.payload.length === 0) {
                card = { ...card, id: +cardId };
                const { data: cardData } = await axios.post(`${apiURL}/goalcards`, card);
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
    }, [cardId, user])

    const createTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        try {
            const position = 1 + cardTasks.reduce((a, b) => a < b.position ? b.position : a, 0);
            const task = { ...cardInfo, card_name: cardName.prev, uid: user.uid, task: newTask, position };
            const { data } = await axios.post(`${apiURL}/tasks/modify`, task);
            if (!data.success) throw data.message;
            setNewTask(prev => "");
            getCardTasks();
        } catch (err) {
            console.warn(err);
        }
    }

    const updateCardName = async (e) => {
        e.preventDefault();
        try {
            const card = { id: +cardId, uid: user.uid, card_name: cardName.curr };
            const { data } = await axios.put(`${apiURL}/goalcards/modify`, card);
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
        if (!user) navigate("/");
        getCardTasks();
    }, [user, navigate, getCardTasks])

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
                        <button onClick={updateCardName}>????</button>
                        <button onClick={revertCardName}>??????</button>
                    </>
                }
            </div>
            <form onSubmit={createTask}>
                <input
                    type="text"
                    id="task_name"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
            </form>
            {cardTasks.map(task =>
                <Task
                    key={task.id}
                    uid={user.uid}
                    editTaskId={editTaskId}
                    setEditTaskId={setEditTaskId}
                    getCardTasks={getCardTasks}
                    {...task}
                />
            )}
            {!cardTasks.length &&
                <div>
                    There is no task yet, please add one!
                </div>
            }
            <button onClick={() => navigate("/board")}>Go back</button>
        </div>
    )
}
