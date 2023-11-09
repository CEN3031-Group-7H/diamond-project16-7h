import React from 'react';

const BadgeToggle = ({ badge, onToggle }) => {
  return (

    <div className="badge">

      <img src={badge.imageUrl} alt={badge.name} />
      <button onClick={() => onToggle(badge.id)}>
        {badge.isVisible ? 'Hide' : 'Show'}
      </button>

    </div>
  );
};


export default BadgeToggle;
