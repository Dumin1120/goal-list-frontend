// import { useState, useEffect } from "react";
import DemoGoalCard from "../components/DemoGoalCard";

export default function TryDemo({ demoCardsData, removeCard }) {
    // const cardsData = demoCardsData;

    // useEffect(() => {
    //     console.log(demoCardsData)
    //     setCardsData(demoCardsData);
    // }, [])

    return (
        <div>
            <h1>DEMO HOMEPAGE HERE</h1>
            <div>
                {demoCardsData.map(card => <DemoGoalCard key={card.id} removeCard={removeCard} {...card} />)}
            </div>
        </div>
    )
}
