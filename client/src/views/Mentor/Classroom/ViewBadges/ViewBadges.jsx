import './ViewBadges.less';
import React, { useState, useEffect } from 'react';
import MentorSubHeader from '../../../../components/MentorSubHeader/MentorSubHeader';
import { useNavigate } from 'react-router-dom';
import createButton from './images/create.png';
import removeButton from './images/remove.png';
import {getClassroom, deleteBadge} from '../../../../Utils/requests';

var backendBadges = null;

function ViewBadges({ classroomId }) {
  // Fill an array with all badges of a selected classroom
  const [teacherBadges, setTeacherBadges] = useState([]);

  //==== Collect all badges pertaining to mentor's class into an array ====//
  if (!backendBadges) {
    backendBadges = getClassroom(classroomId).then((res) => {
      setTeacherBadges(res.data.badges);
    })
  }

  const navigate = useNavigate();

  // This is used when the add badge button is clicked
  const handleAddBadge = () => {
    // Change url to badge creator
    navigate('/classroom/'+ classroomId + '?tab=BadgeCreator');
    // Refresh page
    window.location.reload();
  }

  const handleRemoveBadge = () => {
    if (teacherBadges.length > 0) {
      setTeacherBadges(teacherBadges.slice(0,-1));
      //console.log(teacherBadges);
      //console.log(teacherBadges[teacherBadges.length - 1].id);
      //deleteBadge(teacherBadges[teacherBadges.length - 1].id);
    }
  }


    const[toggleText, setToggleText] = useState("Tile");
    const toggle = () => {
      setToggleText((state) => (state === "List" ? "Tile" : "List"));
    }
    return (
      
      <div className="badgePane">
        <MentorSubHeader
          title={'ViewBadges'}
        />
        <div className={"view-badge-container"}>
          <button
            id='add-new-button'
            onClick={handleAddBadge}
          >
            <img src={createButton} alt="Add new badge" />
          </button>
          <button
            id='remove-button'
          // Perhaps edit mode? Or maybe drag and drop feature?
            onClick={handleRemoveBadge}
          >
            <img src={removeButton} alt="Edit/Remove badge" />
          </button>
          <button id="toggle-button" variant="contained" onClick={toggle}></button>
          <h3>{toggleText}</h3>
          
          {/* Ronan viewbadge code*/}
          <div className="badge-grid">
                {teacherBadges.map((badge, index) => {
                    // Skip rendering if the badge is hidden for that student
                    return (
                        <div key={index} className="badge-item">
                          {badge.image_url && (
                            <img 
                                src={badge.image_url} 
                                alt={badge.name} 
                                className="badge-image"
                            />
                          )}
                          {badge.name && (
                            <p className="badge-name">{badge.name}</p>
                          )}
                        </div>
                    );
                })}
            </div>
            {/* Ronan viewbadge code*/}

          

        </div>
      </div>
      );
}

export default ViewBadges;