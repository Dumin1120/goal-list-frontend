import { useEffect, useRef, useState } from "react";

export default function DemoTodoDetail({ editTodo, removeTodo, id, to_do }) {
    const [description, setDescription] = useState(to_do);
    const [showEditBox, setShowEditBox] = useState(false);
    const buttonEdit = useRef(null);

    const handleChange = (e) => {
        setDescription(prev => e.target.value);
    }

    const handleCancel = () => {
        setShowEditBox(prev => !prev);
        setDescription(prev => to_do);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editTodo(id, description);
        setShowEditBox(prev => !prev);
    }

    useEffect(() => {
        buttonEdit?.current?.focus();
    }, [showEditBox])

    return (

        <div >
            {showEditBox
                ?
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>to-do description:
                            <input ref={buttonEdit} value={description} onChange={handleChange} /><br />
                        </label>
                    </form>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                :
                <div>
                    {description} &nbsp;
                    <button onClick={() => setShowEditBox(prev => !prev)}>EDIT</button>
                </div>
            }
            <button onClick={() => removeTodo(id)}>DEL</button>
        </div>
    )
}
