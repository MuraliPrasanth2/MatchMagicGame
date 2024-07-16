const Card = ({
    selectionOne,
    selectionTwo,
    card,
    handleChoice,
    isDisabled,
}) => {
    const flipped =
        selectionOne?.id === card.id ||
        selectionTwo?.id === card.id ||
        card.matched;

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} alt="card front" className="front" />
                <img
                    src="./img/cover.png"
                    alt="back cover"
                    className="back"
                    onClick={() => (!isDisabled ? handleChoice(card) : "")}
                />
            </div>
        </div>
    );
};

export default Card;
