import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

const cardImages = [
    { src: "/img/helmet-1.png", matched: false },
    { src: "/img/potion-1.png", matched: false },
    { src: "/img/ring-1.png", matched: false },
    { src: "/img/scroll-1.png", matched: false },
    { src: "/img/shield-1.png", matched: false },
    { src: "/img/sword-1.png", matched: false },
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [selectionOne, setSelectionOne] = useState(null);
    const [selectionTwo, setSelectionTwo] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    const newGame = () => {
        setTimeout(() => {
            const shuffleCards = [...cardImages, ...cardImages]
                .sort(() => Math.random() - 0.5)
                .map((card) => ({ ...card, id: Math.random() }));

            setCards(shuffleCards);
            setTurns(0);
            setSelectionOne(null);
            setSelectionTwo(null);
        }, 500);
    };

    useEffect(() => {
        newGame();
    }, []);

    const handleChoice = (card) => {
        selectionOne ? setSelectionTwo(card) : setSelectionOne(card);
    };

    const resetTurn = () => {
        setSelectionOne(null);
        setSelectionTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
        setIsDisabled(false);
    };

    useEffect(() => {
        if (selectionOne && selectionTwo) {
            setIsDisabled(true);
            if (selectionOne.src === selectionTwo.src) {
                setCards((prevCards) =>
                    prevCards.map((card) => {
                        if (card.src === selectionOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    }),
                );
                resetTurn();
            } else {
                setTimeout(resetTurn, 1000);
            }
        }
    }, [selectionOne, selectionTwo]);
    return (
        <div className="App">
            <h1>Magic match</h1>
            <nav>
                <button onClick={newGame}>New Game</button>
            </nav>
            <div className="cards">
                {cards.map((card) => (
                    <Card
                        {...{ card, selectionOne, selectionTwo, handleChoice, isDisabled }}
                    />
                ))}
            </div>
            <p>turns: {turns}</p>
        </div>
    );
}

export default App;
