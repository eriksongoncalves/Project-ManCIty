import React from 'react';

const PlayerCard = ({ number, name, lastName, bck }) => (
  <div className="player_card_wrapper">
    <div
      className="player_card_thmb"
      style={{
        background: `url(${bck})`
      }}
    ></div>
    <div className="player_card_info">
      <div className="player_card_number">
        {number}
      </div>
      <div className="player_card_name">
        <span>{name}</span>
        <span>{lastName}</span>
      </div>
    </div>
  </div>
);

export default PlayerCard;
