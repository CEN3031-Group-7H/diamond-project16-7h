import React, { useEffect, useState } from 'react';
import { getBadge } from '../../Utils/requests';
import './BadgeList.less';


/**
 * @param {badge} badgeToCalculate  The badge we are calculating % earned for
 * @returns {string}                The string we display to the student
 */
function writePercentEarnedMessage( badgeToCalculate ){
    if(badgeToCalculate.classroom.students.length < 1){
        return (
            'Uh oh! This badge is in an empty classroom!'
        )
    }
    else if(badgeToCalculate.students.length == 0){
        return (
            'No students in this class have earned this badge yet'
        )
    }
    else if(badgeToCalculate.students.length == 1){
        return (
            'Only one student has earned this badge!'
        )
    }
    else{
        return (
            (badgeToCalculate.students.length / badgeToCalculate.classroom.students.length)
            + '% of students in your class have earned this badge'
        )
    }
}

/**
 * @param {string} currentStudent   The currently shown profile's student
 * @param {function} badgeId        The id for the badge whose information is being requested
 */
function BadgeDetails( {currentStudent, badgeId} ){
    getBadge().then((res) => {
        if (res.data) {
          const badgeToDisp = res.data
        } else {
          return (
              <div>
                  <div className="missingInfoRectangle">Failed to fetch Badge information.</div>
              </div>
          )
        }
      });

    //see ../../../../server/api/badge/documentation/badge.json
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
}
export default BadgeDetails;