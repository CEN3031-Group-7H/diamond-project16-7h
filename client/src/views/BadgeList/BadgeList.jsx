import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { initHiddenBadges, setBadgeHidden, setBadgeShown, updateStudent } from '../../Utils/requests';
import './BadgeList.less';
import {BadgeDetails} from '../BadgeDetails/BadgeDetails.jsx';

Modal.setAppElement('#root');

/**
 * @param {string} currentStudent The currently shown profile's student
 * @param {function} setCurrentStudent The setter for the student useState in StudentProfile
 * @param {Boolean} editMode Whether to display profile in edit mode
 * @param {Boolean} isOwnProfile
 */
 function BadgeList( {currentStudent, setCurrentStudent, editMode, setEditMode, isOwnProfile} ){

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState({}); 
    const openModal = (badge) => {
        setSelectedBadge(badge);
        setModalOpen(true);
      };
    const closeModal = () => setModalOpen(false);

    if(currentStudent == null){
        // handle logged out student
        return(
            <div>
                <div className="missingInfoRectangle">Log in to see your Badges</div>
            </div>
        )
    }
    else if (currentStudent.profileData == null){
        //update legacy students to have hidden badge array field
        console.log("Updating local student to have hidden badge array")
        initHiddenBadges(currentStudent.id).then((res) => {
            if (res.data) {
                console.log('1');
                console.log(res.data);
                setCurrentStudent(res.data);
            } else {
                console.log('2');
                console.log(res.err);
            }
        });
            
    }
    else if (currentStudent.profileData.hiddenBadges == null){
        //solution to implement hidden badge list likely to change
        console.log("Updating local student to have hidden badge array")
        initHiddenBadges(currentStudent.id).then((res) => {
            if (res.data) {
                console.log(res.data);
                setCurrentStudent(res.data);
            } else {
              console.log(res.err);
            }
        });
    }

    else if (currentStudent.badges == null){
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
                <BadgeDetails
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    selectedBadge={selectedBadge}
                    teacherView={false}
                />

            {isOwnProfile && (
                <div id='editButton'>
                <button className='toggleEditButton' onClick={() => setEditMode(!editMode)}>✎</button>
                </div>
            )}
    
            <div className="badge-grid">
                {currentStudent.badges.map((badge, index) => {
                    console.log(currentStudent);
                    // Skip rendering if the badge is hidden for that student
                    if (currentStudent.profileData.hiddenBadges.includes( badge.id )) {
                        return null;
                    }
                    else{
                    return (
                        <div key={index} className="badge-item">
                          {badge.image_url && (
                            <img 
                                src={badge.image_url} 
                                alt={badge.name} 
                                className="badge-image"
                                onClick={() => {openModal(badge);}}
                            />
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
                    if (currentStudent.profileData.hiddenBadges.includes( badge.id )) {
                        return null;
                    }
                    else{
                    return (
                        <div>
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
                            {badge.id && (
                                <button
                                    className="hideBadgeButton"
                                    onClick={() => {
                                        setBadgeHidden(currentStudent.id, badge.id).then((res) => {
                                            if (res.data) {
                                                console.log(res.data);
                                                setCurrentStudent(res.data);
                                            } else {
                                              console.log(res.err);
                                            }
                                        });
                                    }}
                                >-</button>
                            )}
                        </div>
                        </div>
                    );
                    }
                })}
            </div>

            {/*Cuttently hidden badges, with buttons to show */}
            <div className="badge-grid">
                {currentStudent.badges.map((badge, index) => {
                    // Skip rendering if the badge is shown for that student
                    if (!currentStudent.profileData.hiddenBadges.includes( badge.id )) {
                        return null;
                    }
                    else{
                    return (
                        <div>
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
                        {badge.id && (
                            <button
                                className="showBadgeButton"
                                onClick={() => {
                                    setBadgeShown(currentStudent.id, badge.id).then((res) => {
                                        if (res.data) {
                                            console.log(res.data);
                                            setCurrentStudent(res.data);
                                        } else {
                                          console.log(res.err);
                                        }
                                    });
                                }}
                            >+</button>
                        )}
                        </div>
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