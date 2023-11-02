import React, { useEffect, useState } from 'react';

/**
 * @param {string} badgeId The badge id
 */
function BadgeHideToggleButton(badgeId){
    //if badge.hidden = false
    return(
        <button type="hideBadgeButton">-</button> 
    )
    //else
    return(
        <button type="showBadgeButton">+</button> 
    )
}

/**
 * @param {string} studentId The date
 * @param {Boolean} editMode The string
 */
function BadgeList(studentId, editMode){
    return(
        <div>

        </div>
    )
}