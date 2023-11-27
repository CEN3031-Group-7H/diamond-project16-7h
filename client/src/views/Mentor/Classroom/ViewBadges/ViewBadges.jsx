import './ViewBadges.less';
import React, { useState, useEffect } from 'react';
import MentorSubHeader from '../../../../components/MentorSubHeader/MentorSubHeader';
import { useNavigate } from 'react-router-dom';
import createButton from './images/create.png';
import removeButton from './images/remove.png';
import {getMentor, getTeacherClassroom} from '../../../../Utils/requests';

function ViewBadges() {
  /*
  // Fill an array with all classrooms a teacher belngs to
  const [teacherClasses, setTeacherClasses] = useState([]);

  // Fill an array with all badges of a selected classroom
  const [teacherBadges, setTeacherBadges] = useState([]);

   // Iterate through whatever data structure holds the badges and add them to the teacherbadges array
   // Stores all mentor classes by code.
   var detectedClasses = [];
   var detectedBadges = [];
  
   //==== Collect all classes pertaining to mentor into an array ====//
  const backendClasses = getMentorClassrooms()
  backendClasses.forEach(
    function (classroomIter) {
      detectedClasses.push(classRoomIter.code)
    }
  );
  setTeacherClasses(detectedClasses);
  
  // To be used to select which classes badges to obtain
  const chosenCode = 0;
  //==== Collect all badges pertaining to mentor's class into an array ====//
  const backendBadges = getTeacherClassroom(chosenCode);
  backendBadges.forEach(
    function (currentBadge) {
      detectedBadges.push(currentBadge);
    }
  );
  setTeacherBadges(detectedBadges);
*/

  const navigate = useNavigate();

  // This is used when the add badge button is clicked
  const handleAddBadge = () => {
    // Change url to badge creator
    navigate('/classroom/10?tab=BadgeCreator');
    // Refresh page
    window.location.reload();
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
          >
            <img src={removeButton} alt="Edit/Remove badge" />
          </button>
          <button id="toggle-button" variant="contained" onClick={toggle}></button>
          <h3>{toggleText}</h3>
        </div>
      </div>
        
      );
}

export default ViewBadges;