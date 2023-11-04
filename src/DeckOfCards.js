import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const API_BASE_URL = 'http://deckofcardsapi.com/api/deck';

const DeckOfCards = () => {
    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function loadDeck() {
            const response = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
            setDeck(response.data);
        }
        loadDeck();
    }, []);

    const drawCard = async () => {
        if (!deck) return;

        if (cards.length >= 51) {
            alert('All cards have been drawn.');
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/?count=1`);
            const newCard = response.data.cards[0];

            setCards(cards => [
                ...cards,
                {
                    id: newCard.code,
                    name: `${newCard.suit} ${newCard.value}`,
                    image: newCard.image,
                },
            ]);
        } catch (error) {
            console.error('Error drawing a card:', error);
        }
    };

    return (
        <div>
            {deck ? (
                <div>
                    <button onClick={drawCard}>Draw a card</button>
                    <div className='Deck-cardarea'>
                        {cards.map((card) => (
                            <Card key={card.id} name={card.name} image={card.image} />
                        ))}
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default DeckOfCards;
