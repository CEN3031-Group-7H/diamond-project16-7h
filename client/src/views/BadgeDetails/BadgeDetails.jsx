import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getBadge, getClassroomSize, getBadgeEarnCt} from '../../Utils/requests';
import './BadgeDetails.less';


/**
 * @param {int} classId  The id of the classroom we are calculating stats relative to
 * @param {int} badgeId  The if of the badge we want to get earnage numbers for
 * @returns {string}                The string we display to the student
 */
async function getPercentMessage(classId, badgeId){
      // find classroom size
      console.log("getting PEM ids: " + classId + " " + badgeId);
      getBadgeEarnCt(badgeId).then((earnedRes) => {
          if(earnedRes.data){
            earnedCt = earnedRes.data;
            getClassroomSize(classId).then((totalRes) => {
                if (totalRes.data) {
                    console.log(totalRes.data);
                    classroomsize = totalRes.data;
                    if(classroomsize < 1){
                        percentage = -1
                        message = 'Uh oh! This badge is in an empty classroom!'
                      }
                      else if(earnedCt == 0){
                        percentage = 0
                        message = 'No students in this class have earned this badge yet'
                      }
                      else if(earnedCt == 1){
                        percentage = (int)(100 / classroomsize)
                        message = 'Only one student has earned this badge!'
                      }
                      else{
                        percentage = (int)(earnedCt / classroomsize * 100)
                        message = percentage + '% of students in your class have earned this badge'
                      }
                      return({percentage: percentage, message: message});
                } else {
                  console.log(totalRes.err);
                  percentage = 0;
                  message = "Failed to Fetch classroom size"
                  return({percentage: percentage, message: message});
                }
            });
          } else {
          console.log(earnedRes.err);
          percentage = 0;
          message = "Failed to Fetch number of students earned"
          return({percentage: percentage, message: message});
        }
      });
    }

/**
 * @param {collection} badge        The id of the badge whose information is being requested
 */
function MainBadgeInfo(badgeToDisp){
    /*
    getBadge(badgeId).then((res) => {
        if (res.data) {
          const badgeToDisp = res.data
          return(
            <div id='activity-container'>
                <div id='header'>
                    <div>{badgeToDisp.name}</div>
                </div>
                <div id='badge-image' >
                    <img src={badgeToDisp.image_url} alt={badgeToDisp.name} />
                </div>
                <div id='badge-description' >
                    <div>{badgeToDisp.description}</div>
                </div>
                <div id='earned-percent-bar' >
                    <div>{writePercentEarnedMessage(badgeToDisp)}</div>
                </div>
            </div>
        )
        } else {
          return (
              <div>
                  <div className="missingInfoRectangle">Failed to fetch Badge information.</div>
              </div>
          )
        }
      });
      */
    //see ../../../../server/api/badge/documentation/badge.json
    console.log(badgeToDisp, badgeToDisp.id);
    if(!(badgeToDisp==null) && badgeToDisp != {} && !(badgeToDisp.id==null)){
        //const stats = getPercentMessage(badgeToDisp.classroom, badgeToDisp.id);
        const stats = {message: "Percentage fetching not yet implemented", percentEarned: 0}
        return(
            <div id='activity-container'>
                {badgeToDisp.name && (
                <div id='header'>
                    <div>{badgeToDisp.name}</div>
                </div>
                )}

                {badgeToDisp.image_url && (
                <div id='badge-image' >
                    <img src={badgeToDisp.image_url} alt={badgeToDisp.name} />
                </div>
                )}
                
                {badgeToDisp.description && (
                <div id='badge-description' >
                    <div>{badgeToDisp.description}</div>
                </div>
                )}
                {stats && stats.percentEarned &&(
                <div id='earned-percent-bar' >
                    <div>{stats.percentEarned}</div>
                </div>
                )}
                {stats && stats.message &&(
                    <div id='earned-percent-message'>
                        <div>{stats.message}</div>
                    </div>
                )}
            </div>
        )
    } else {
        return (
            <div>
                <div className="missingInfoRectangle">Failed to fetch Badge information.</div>
            </div>
        )
    }
    
}
function TeacherOnlyBadgeInfo(){
  
}


/**
 * @param {collection} badge        The badge whose information is being requested
 */
 const BadgeDetails = ({ isOpen, onRequestClose, selectedBadge }) => {
     console.log(selectedBadge)
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Bade Details Popup"
      >
        {MainBadgeInfo(selectedBadge)}
        <button onClick={onRequestClose}>Close</button>
      </Modal>
    );
  };

export default BadgeDetails;