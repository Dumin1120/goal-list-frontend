import { useState, useRef, useEffect } from "react";
import DemoGoalCard from "../components/DemoGoalCard";

export default function TryDemo({ demoCardsData, addCard, editCard, removeCard }) {
    const [cardName, setCardName] = useState("");
    const [showInputBox, setShowInputBox] = useState(false);
    const buttonCreate = useRef(null);

    const handleChange = (e) => {
        setCardName(prev => e.target.value);
    }

    const handleCancel = () => {
        setShowInputBox(prev => !prev);
        setCardName(prev => "");
    }

    const handleCreate = (e) => {
        e.preventDefault();
        addCard(cardName);
        handleCancel();
    }

    const handleNewName = () => {
        setShowInputBox(prev => !prev);
    }

    useEffect(() => {
        buttonCreate?.current?.focus();
    }, [showInputBox])

    return (
        <div>
            <h1>DEMO HOMEPAGE HERE</h1>
            {showInputBox
                ?
                <div>
                    <form onSubmit={handleCreate}>
                        <label>card name:
                            <input ref={buttonCreate} value={cardName} onChange={handleChange} /><br />
                        </label>
                    </form>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleCreate}>Create</button>
                </div>
                :
                <button onClick={handleNewName}>ADD NEW CARD</button>
            }
            <div>
                {demoCardsData.map(card => <DemoGoalCard
                    key={card.id}
                    addCard={addCard}
                    editCard={editCard}
                    removeCard={removeCard}
                    {...card}
                />)}
            </div>
        </div>
    )
}
