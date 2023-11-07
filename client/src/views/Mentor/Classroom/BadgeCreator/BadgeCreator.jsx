import './BadgeCreator.less';
import React, { useState } from 'react';

function BadgeCreator() {
  // State for each input field
  const [badgeName, setBadgeName] = useState('');
  const [badgeDescription, setBadgeDescription] = useState('');
  const [badgeCriteria, setBadgeCriteria] = useState('');
  const [badgeIcon, setBadgeIcon] = useState(null);

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Create a FormData object to hold the file data
    const formData = new FormData();
    formData.append('name', badgeName);
    formData.append('description', badgeDescription);
    formData.append('criteria', badgeCriteria);
    formData.append('icon', badgeIcon);

    // TODO: Post formData to the server
    console.log('Form submitted', formData);

    // Reset the form fields
    setBadgeName('');
    setBadgeDescription('');
    setBadgeCriteria('');
    setBadgeIcon(null);
  };

  // Handlers for changing the state of each input field
  const handleNameChange = (event) => setBadgeName(event.target.value);
  const handleDescriptionChange = (event) => setBadgeDescription(event.target.value);
  const handleCriteriaChange = (event) => setBadgeCriteria(event.target.value);
  const handleIconChange = (event) => setBadgeIcon(event.target.files[0]);

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
            required
          />
        </div>
        <button type="submit">Create Badge</button>
      </form>
    </div>
  );
}

export default BadgeCreator;
