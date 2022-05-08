import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { apiURL } from "../utils/apiURL";
import axios from "axios";
import Task from "./Task";

export default function GoalCardDetail() {
    const user = useContext(UserContext);
    const { cardId } = useParams();
    const navigate = useNavigate();
    const [cardDetail, setCardDetail] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editTaskId, setEditTaskId] = useState(-1);

    const getCardDetail = useCallback(async () => {
        try {
            const card = { card_id: +cardId, uid: user.uid };
            const { data } = await axios.post(`${apiURL}/tasks`, card);
            if (!data.success) throw data.message;
            setCardDetail(prev => data.payload);
        } catch (err) {
            console.warn(err);
        }
    }, [cardId, user])

    const createTask = async (e) => {
        e.preventDefault();
        try {
            const task = {
                card_id: +cardId, uid: user.uid, task: newTask,
                position: cardDetail.reduce((a, b) => b.position > a ? b.position : a, 0) + 1
            };
            const { data } = await axios.post(`${apiURL}/tasks/modify`, task)
            if (!data.success) throw data.message;
            setNewTask(prev => "");
            getCardDetail();
        } catch (err) {
            console.warn(err);
        }
    }

    useEffect(() => {
        if (!user) navigate("/");
        getCardDetail();
    }, [user, navigate, getCardDetail])

    return (
        <div>
            <form onSubmit={createTask}>
                <input
                    type="text"
                    id="card_name"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
            </form>
            {cardDetail.map(task =>
                <Task
                    key={task.id}
                    editTaskId={editTaskId}
                    setEditTaskId={setEditTaskId}
                    getCardDetail={getCardDetail}
                    {...task}
                />
            )}
            {!cardDetail.length &&
                <div>
                    There is no task yet, please add one!
                </div>
            }
            <button onClick={() => navigate("/board")}>Go back</button>
        </div>
    )
}
