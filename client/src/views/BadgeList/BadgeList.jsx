import React, { useEffect, useState } from 'react';
import { updateStudent } from '../../Utils/requests';
import './BadgeList.less';


/**
 * @param {string} currentStudent The currently shown profile's student
 * @param {function} setCurrentStudent The setter for the student useState in StudentProfile
 * @param {Boolean} editMode Whether to display profile in edit mode
 * @param {Boolean} isOwnProfile
 */
function BadgeList( {currentStudent, setCurrentStudent, editMode, setEditMode, isOwnProfile, junkForUpdate, updateViaJunk} ){
    console.log("rendering BadgeList")

    if(currentStudent == null){
        // handle logged out student
        return(
            <div>
                <div className="missingInfoRectangle">Log in to see your Badges</div>
            </div>
        )
    }


    if (currentStudent.hidden_badge_ids == null){
        //solution to implement hidden badge list likely to change
        console.log("Updating local student to have hidden badge array")
        currentStudent.hidden_badge_ids = [];
        //updateStudent(currentStudent.id, currentStudent); //currentStudents currently assignd no role, so authentication will not work
        setCurrentStudent(currentStudent);
    }

    if (currentStudent.badges == null){
        // if badges object is missing
        return(
            <div>
                <div className="missingInfoRectangle">Student has not earned any badges yet</div>
            </div>
        )
    }
    else if (currentStudent.badges.length == 0){
        // if badges empty
        return(
            <div>
                <div className="missingInfoRectangle">Student has not earned any badges yet</div>
            </div>
        )
    }
    else if (!editMode){
        //else if edit mode off
        return(
            <div>
            {isOwnProfile && (
                <div id='editButton'>
                <button className='toggleEditButton' onClick={() => setEditMode(!editMode)}>✎</button>
                </div>
            )}
    
            <div className="badge-grid">
                {currentStudent.badges.map((badge, index) => {
                    // Skip rendering if the badge is hidden for that student
                    if (currentStudent.hidden_badge_ids.includes( badge.id )) {
                        return null;
                    }
                    else{
                    return (
                        <div key={index} className="badge-item">
                          {badge.image_url && (
                            <img src={badge.image_url} alt={badge.name} height = "200" />
                          )}
                          {badge.name && (
                            <p className="badge-name">{badge.name}</p>
                          )}
                        </div>
                    );
                    }
                })}
            </div>
            </div>
        )
    }
    else{
        //edit mode
        return(
            <div>
            <div id='editButton'>
              <button className='toggleEditButton' onClick={() => setEditMode(!editMode)}>✎</button>
            </div>
            {/*Currently shown badges, with buttons to hide */}
            <div className="badge-grid">
                {currentStudent.badges.map((badge, index) => {
                    // Skip rendering if the badge is hidden for that student
                    if (currentStudent.hidden_badge_ids.includes( badge.id )) {
                        return null;
                    }
                    else{
                    return (
                        <div key={index} className="badge-item">
                            {badge.image_url && (
                                <img src={badge.image_url} alt={badge.name} height = "200" />
                            )}
                            {badge.name && (
                                <p className="badge-name">{badge.name}</p>
                            )}
                            {badge.id && (
                                <button
                                    className="hideBadgeButton"
                                    onClick={() => {
                                        currentStudent.hidden_badge_ids.push(badge.id);
                                        //updateStudent(currentStudent.id, currentStudent); //students currently assignd no role, so authentication will not work
                                        setCurrentStudent(currentStudent);
                                        updateViaJunk(junkForUpdate + 1); // Currently experiencing issues with setCurrentStudent not triggering a rerender.
                                    }}
                                >-</button>
                            )}
                        </div>
                    );
                    }
                })}
            </div>

            {/*Cuttently hidden badges, with buttons to show */}
            <div className="badge-grid">
                {currentStudent.badges.map((badge, index) => {
                    // Skip rendering if the badge is shown for that student
                    if (!currentStudent.hidden_badge_ids.includes( badge.id )) {
                        return null;
                    }
                    else{
                    return (
                        <div key={index} className="badge-item">
                        {badge.image_url && (
                            <img src={badge.image_url} alt={badge.name} height = "200" />
                        )}
                        {badge.name && (
                            <p className="badge-name">{badge.name}</p>
                        )}
                        {badge.id && (
                            <button
                                className="showBadgeButton"
                                onClick={() => {
                                    currentStudent.hidden_badge_ids = currentStudent.hidden_badge_ids.filter(function(e) { return e !== badge.id});
                                    //updateStudent(currentStudent.id, currentStudent); //students currently assignd no role, so authentication will not work
                                    setCurrentStudent(currentStudent);
                                    updateViaJunk(junkForUpdate + 1); // Currently experiencing issues with setCurrentStudent not triggering a rerender.
                                }}
                            >+</button>
                        )}
                        </div>
                    );
                    }
                })}
            </div>
            </div>
        )
    }
}
export default BadgeList;