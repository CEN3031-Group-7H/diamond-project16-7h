import './BadgeCreator.less';
import React, { useState } from 'react';
import {createBadge, getClassroom, getTeacherClassroom} from '../../../../Utils/requests';
import { message } from 'antd';


// Sanitizing user input to prevent XSS and other cyber attacks
const sanitizeInput = (input) => {
    // Remove script tags and any content within them
    input = input.replace(/<script.*?>.*?<\/script>/gi, '');
  
    // Encode HTML entities to prevent HTML injection
    input = input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
    // Remove any remaining HTML tags
    input = input.replace(/<\/?[^>]+(>|$)/g, "");
  
    // Remove anything that's not a letter, number, whitespace, or common punctuation
    input = input.replace(/[^a-zA-Z0-9\s.,!?'"-]/g, '');
  
    return input;
  };  

function BadgeCreator({ classroomId }) {
  // State for each input field
  const [badgeName, setBadgeName] = useState('');
  const [badgeDescription, setBadgeDescription] = useState('');
  const [badgeCriteria, setBadgeCriteria] = useState('');
  const [badgeImageUrl, setBadgeImageUrl] = useState('');
  const [badgeImageSelection, setBadgeImageSelection] = useState('');

  

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Cyber security measures. 
    const sanitizedBadgeName = sanitizeInput(badgeName);
    const sanitizedBadgeDescription = sanitizeInput(badgeDescription);
    const sanitizedBadgeCriteria = sanitizeInput(badgeCriteria);
    const classroomResponse = await getClassroom(classroomId);
  
    // Create a json object to hold the badge data
    const badgeData = {
      name: sanitizedBadgeName,
      description: sanitizedBadgeDescription,
      criteria: sanitizedBadgeCriteria,
      image_url: badgeImageUrl, // Assuming this is a URL or base64 encoded string
      classroom: classroomResponse.data,
      students: [],
      default_visible: true,
    };

    // Call requests.js function to store the badge on the backend
    
    const response = await createBadge(badgeData);
    console.log(response);
    if (response.err) {
      message.error(response.err)
    }
  
    setBadgeName('');
    setBadgeDescription('');
    setBadgeCriteria('');
    setBadgeImageUrl('');
  
    window.location.reload();
};
    
  

  // Handlers for changing the state of each input field
  const handleNameChange = (event) => setBadgeName(event.target.value);
  const handleDescriptionChange = (event) => setBadgeDescription(event.target.value);
  const handleCriteriaChange = (event) => setBadgeCriteria(event.target.value);
  const handleImageUrlChange = (event) => setBadgeImageUrl(event.target.value);
  const handleSelectionChange = (event) => {
    // Check if the "Other" option was selected, meaning a custom url will be used
    if(event.target.value == "other") {
      // unhide the custom text input
      document.getElementById("customUrlLabel").hidden = false;
      document.getElementById("badgeImageUrl").hidden = false;
      setBadgeImageUrl(event.target.value);
    } else {
      // hide the custom text input
      document.getElementById("customUrlLabel").hidden = true;
      document.getElementById("badgeImageUrl").hidden = true;
      setBadgeImageUrl(event.target.value);
    }
    setBadgeImageSelection(event.target.value);
  }


  return (
    <div className="badge-creator">
      <h1>Create a New Badge</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="badgeName">Badge Name:</label>
          <input
            type="text"
            id="badgeName"
            value={badgeName}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="badgeDescription">Badge Description:</label>
          <textarea
            id="badgeDescription"
            value={badgeDescription}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div>
          <label htmlFor="badgeCriteria">Badge Criteria:</label>
          <textarea
            id="badgeCriteria"
            value={badgeCriteria}
            onChange={handleCriteriaChange}
            required
          />
        </div>
        <div>
          <label htmlFor="badgeImageSelection">Preset Badge Images</label>
          <select id="badgeImageSelection" value={badgeImageSelection} onChange={handleSelectionChange}>
            <option value="/images/trophy_badge.png">Trophy 🏆</option>
            <option value="/images/thumbs_up_badge.png">Thumbs Up 👍</option>
            <option value="/images/star_badge.png">Star ⭐</option>
            <option value="/images/ribbon_badge.png">Ribbon 🎀</option>
            <option value="/images/heart_badge.png">Heart 💟</option>
            <option value="/images/apple_badge.png">Apple 🍎</option>
            <option value="other">Other</option>
            required
          </select>
        </div>
        <div>
          <label id="customUrlLabel" htmlFor="badgeImageUrl" hidden>Custom Badge Image URL:</label>
          <input
            type="text"
            id="badgeImageUrl"
            value={badgeImageUrl}
            onChange={handleImageUrlChange}
            hidden
            required
          />
        </div>
        <button type="submit">Create Badge</button>
      </form>
    </div>
  );
}

export default BadgeCreator;
