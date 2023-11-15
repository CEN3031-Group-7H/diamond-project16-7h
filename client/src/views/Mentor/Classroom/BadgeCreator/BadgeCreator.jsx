import { createBadge } from '../../../../Utils/requests';
import './BadgeCreator.less';
import React, { useState } from 'react';


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

function BadgeCreator() {
  // State for each input field
  const [badgeName, setBadgeName] = useState('');
  const [badgeDescription, setBadgeDescription] = useState('');
  const [badgeCriteria, setBadgeCriteria] = useState('');
  const [badgeIcon, setBadgeIcon] = useState(null);

  const handleIconChange = (event) => {
    const file = event.target.files[0];
    const validImageTypes = ['image/png', 'image/jpeg', 'image/heic'];
    
    if (file && validImageTypes.includes(file.type)) {
      setBadgeIcon(file);
    } else {
      alert('Please select an image file (png, jpeg, heic).');
      event.target.value = ''; // Clear the file input
    }
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Cyber security measures. 
    const sanitizedBadgeName = sanitizeInput(badgeName);
    const sanitizedBadgeDescription = sanitizeInput(badgeDescription);
    const sanitizedBadgeCriteria = sanitizeInput(badgeCriteria);
  
    // Create a FormData object to hold the file data
    const formData = new FormData();
    formData.append('name', sanitizedBadgeName);
    formData.append('description', sanitizedBadgeDescription);
    formData.append('criteria', sanitizedBadgeCriteria);
    formData.append('icon', badgeIcon);

    // Call requests.js function to store the badge on the backend
    
    const response = await createBadge(formData);
    console.log(response);
    if (response.err) {
      message.error(response.err)
    }
  
    setBadgeName('');
    setBadgeDescription('');
    setBadgeCriteria('');
    setBadgeIcon(null);
  
  
};
    
  

  // Handlers for changing the state of each input field
  const handleNameChange = (event) => setBadgeName(event.target.value);
  const handleDescriptionChange = (event) => setBadgeDescription(event.target.value);
  const handleCriteriaChange = (event) => setBadgeCriteria(event.target.value);

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
          <label htmlFor="badgeIcon">Badge Icon:</label>
          <input
            type="file"
            id="badgeIcon"
            onChange={handleIconChange}
            accept="image/png, image/jpeg, image/heic"
            required
          />
        </div>
        <button type="submit">Create Badge</button>
      </form>
    </div>
  );
}

export default BadgeCreator;
