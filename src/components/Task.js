import { useEffect, useRef, useState } from "react";
import { apiURL } from "../utils/apiURL";
import axios from "axios";
import "./Task.scss";

export default function Task({
    id,
    card_id,
    uid,
    task,
    position,
    completed,
    editTaskId,
    setEditTaskId,
    getCardTasks }) {
    const [taskText, setTaskText] = useState({ prev: task, curr: task });
    const [taskCompleted, setTaskCompleted] = useState(completed);
    const btnEdit = useRef(null);

    const updateTask = async (e) => {
        e.preventDefault();
        try {
            const task = { id, uid, task: taskText.curr };
            const { data } = await axios.put(`${apiURL}/tasks/modify`, task);
            console.log("TASK L25", data)
            if (!data.success) throw data.message;
            const { curr } = taskText;
            setTaskText({ prev: curr, curr });
            setEditTaskId(-1);
            getCardTasks();
        } catch (err) {
            console.warn(err);
        }
    }

    const revertTask = () => {
        const { prev } = taskText;
        setTaskText({ prev, curr: prev });
        setEditTaskId(-1);
    }

    const deleteTask = async () => {
        try {
            const task = { data: { id, uid } };
            const { data } = await axios.delete(`${apiURL}/tasks/modify`, task);
            if (!data.success) throw data.message;
            getCardTasks();
        } catch (err) {
            console.warn(err);
        }
    }

    const toggleTaskCompleted = async () => {
        try {
            const task = { id, uid, completed: !taskCompleted };
            const { data } = await axios.put(`${apiURL}/tasks/modify`, task);
            if (!data.success) throw data.message;
            setTaskCompleted(prev => !prev);
        } catch (err) {
            console.warn(err);
        }
    }

    useEffect(() => {
        const { prev, curr } = taskText;
        if (prev !== curr) {
            setTaskText({ prev, curr: prev });
        }
        btnEdit?.current?.focus();
        // eslint-disable-next-line
    }, [editTaskId])

    return (
        <div className="task">
            <div>
                <label htmlFor={taskText.prev}>
                    <input
                        type="checkbox"
                        id={id}
                        checked={taskCompleted}
                        onChange={toggleTaskCompleted}
                    />
                </label>
                {editTaskId === id
                    ?
                    <div>
                        <form onSubmit={updateTask}>
                            <input
                                ref={btnEdit}
                                value={taskText.curr}
                                onChange={(e) => setTaskText(prev => ({ ...prev, curr: e.target.value }))}
                            />
                        </form>
                        <button onClick={updateTask}>Submit</button>
                        <button onClick={revertTask}>Cancel</button>
                    </div>
                    :
                    <h3 onClick={() => setEditTaskId(prev => id)}>
                        {task}
                    </h3>
                }
                <button onClick={deleteTask}>
                    DEL
                </button>
                <br />
            </div>
        </div>
    )
}
