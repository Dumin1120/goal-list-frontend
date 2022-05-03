import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function DemoGoalCard({ id, card_name, editCard, removeCard }) {
    const [cardName, setCardName] = useState(card_name);
    const [showEditBox, setShowEditBox] = useState(false);
    const buttonEdit = useRef(null);

    const handleChange = (e) => {
        setCardName(prev => e.target.value);
    }

    const handleCancel = () => {
        setShowEditBox(prev => !prev);
        setCardName(prev => card_name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editCard(id, cardName);
        setShowEditBox(prev => !prev);
    }

    useEffect(() => {
        buttonEdit?.current?.focus();
    }, [showEditBox])

    return (
        <div>
            <h2>GOALCARD HERE</h2>
            {showEditBox
                ?
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Card name:
                            <input ref={buttonEdit} value={cardName} onChange={handleChange} /><br />
                        </label>
                    </form>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                :
                <div>
                    <Link to={`${id}`}>{card_name}</Link>
                    <button onClick={() => setShowEditBox(prev => !prev)}>EDIT</button>
                    <button onClick={() => removeCard(id)}>REMOVE</button>
                </div>
            }
        </div>
    )
}
