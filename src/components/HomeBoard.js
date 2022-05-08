import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { apiURL } from "../utils/apiURL";
import axios from "axios";
import GoalCard from "./GoalCard";
import "./HomeBoard.scss";

export default function HomeBoard() {
    const [cards, setCards] = useState([]);
    const [cardName, setCardName] = useState("");
    const [editCardId, setEditCardId] = useState(-1);
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const getAllCards = useCallback(async () => {
        try {
            const { data } = await axios.post(`${apiURL}/goalcards`, { uid: user?.uid })
            if (!data.success) throw data.message;
            setCards(prev => data.payload);
        } catch (err) {
            console.log(err);
        }
    }, [user])

    const createCard = async (e) => {
        e.preventDefault();
        try {
            const newCard = { uid: user.uid, card_name: cardName };
            const { data } = await axios.post(`${apiURL}/goalcards/modify`, newCard)
            if (!data.success) throw data.message;
            setCardName(prev => "");
            getAllCards();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!user) return navigate("/");
        getAllCards();
    }, [getAllCards, user, navigate])

    return (
        <div className='homeboard'>
            <form onSubmit={createCard}>
                <input
                    type="text"
                    id="card_name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                />
            </form>
            {cards.map(card =>
                <GoalCard
                    key={card.id}
                    editCardId={editCardId}
                    setEditCardId={setEditCardId}
                    getAllCards={getAllCards}
                    {...card}
                />)}
        </div>
    )
}
