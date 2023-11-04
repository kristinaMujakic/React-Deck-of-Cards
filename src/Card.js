import React from 'react';

const Card = ({ image, name }) => (
    <div>
        <img src={image} alt={name} />
    </div>
);

export default Card;
