import './ViewBadges.less';
import React, { useState } from 'react';
import MentorSubHeader from '../../../../components/MentorSubHeader/MentorSubHeader';
import { useNavigate } from 'react-router-dom';
import createButton from './images/create.png';
import removeButton from './images/remove.png';

function ViewBadges() {
  const navigate = useNavigate();
  const handleAddBadge = () => {
    navigate('/classroom/10?tab=BadgeCreator');
    window.location.reload();
  }
  
    return (
        <div className="badgePane">
          <MentorSubHeader
            title={'ViewBadges'}
          />
          <div className="view-badge-container">
            <button
              id='add-new-button'
              onClick={handleAddBadge}
            >
              <img src={createButton} alt="Add new badge"/>
            </button>

            <button
              id='remove-button'
              // Perhaps edit mode? Or maybe drag and drop feature?
            >
              <img src={removeButton} alt="Add new badge"/>
            </button>
          </div>
        </div>
        
      );
}

export default ViewBadges;