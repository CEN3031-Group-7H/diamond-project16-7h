import { message } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import { Tab, Tabs, TabPanel, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.less';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { useGlobalState } from '../../Utils/userState';
import { getCurrentStudents, updateBadgeVisibility, getStudents, getStudentClassroom } from '../../Utils/requests';
import './StudentProfile.less';
import BadgeList from '../BadgeList/BadgeList.jsx';
import BadgeToggle from '../../components/BadgeToggle.jsx';



function StudentProfile() {

  const [currentStudent, setCurrentStudent] = useState(null);
  const [badgesArr, setBadgesArr] = useState([]);  
  const [editMode, setEditMode] = useState(false);

  const [junkForUpdate, updateViaJunk] = useState(0); // Currently experiencing issues with setCurrentStudent not triggering a rerender.


  // Get the currently logged in student (if not already retrieved)
  if(!currentStudent) {
    getCurrentStudents().then((res) => {
      if (res.data) {
        setCurrentStudent(res.data.students[0]);
        console.log(res.data);
        // parse the badges from the student object
        const badgesObj = res.data.students[0].badges;
        var badgesArr = [];
        badgesObj.forEach(function (currentVal) {
          badgesArr.push(currentVal.name);
        });
        setBadgesArr(badgesArr);
      } else {
        message.error(res.err);
      }
    });
  }

  console.log(badgesArr);
  console.log(currentStudent);

  function handleToggleBadgeVisibility(badgeId) {
    // Find the badge with the given id
    const badgeIndex = badgesArr.findIndex(badge => badge.id === badgeId);
    if (badgeIndex === -1) return; // Exit if the badge wasn't found
  
    // Toggle the visibility of the badge
    const updatedBadge = { ...badgesArr[badgeIndex], visible: !badgesArr[badgeIndex].visible };
  
    // Call the API to update the badge visibility on the backend
    updateBadgeVisibility(updatedBadge.id, updatedBadge.visible)
      .then(response => {
        // Check if the response has data and no error
        if (response.data && !response.err) {
          // If the backend update is successful, update the state on the front end
          const updatedBadgesArr = badgesArr.map(b =>
            b.id === badgeId ? updatedBadge : b
          );
          setBadgesArr(updatedBadgesArr);
        } else {
          // If there is an error, log it and do not update the state
          message.error('Failed to update badge visibility: ' + response.err);
        }
      })
      .catch(error => {
        // Handle any network errors
        message.error('Failed to update badge visibility: ' + error.message);
      });
  }
  
  

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='activity-container'>
        <div id='header'>
            <div>Welcome {!(currentStudent == null) ? currentStudent.name + ' !' : ''}</div>
        </div>
        <div>
          <Tabs>
            <TabList align='start'>
              <Tab>Featured Projects</Tab>
              <Tab>Earned Badges</Tab>
            </TabList>
            <TabPanel>
              <tr>
                <img src="/images/dummy_featured_project.png" height={"125px"} width={"275px"} style={{padding: "10px 20px 10px 20px"}}/>
                <img src="/images/dummy_featured_project.png" height={"125px"} width={"275px"} style={{padding: "10px 20px 10px 20px"}}/>
                <img src="/images/dummy_featured_project.png" height={"125px"} width={"275px"} style={{padding: "10px 20px 10px 20px"}}/>
              </tr>
              <tr>
                <i style={{display: "inline-grid", width: "275px", padding: "10px 20px 10px 20px"}}>The Boggert</i>
                <i style={{display: "inline-grid", width: "275px", padding: "10px 20px 10px 20px"}}>The Boggert</i>
                <i style={{display: "inline-grid", width: "275px", padding: "10px 20px 10px 20px"}}>The Boggert</i>
              </tr>
              <tr><p></p></tr>
              <tr>
                <img src="/images/dummy_featured_project.png" height={"125px"} width={"275px"} style={{padding: "10px 20px 10px 20px"}}/>
                <img src="/images/dummy_featured_project.png" height={"125px"} width={"275px"} style={{padding: "10px 20px 10px 20px"}}/>
                <img src="/images/dummy_featured_project.png" height={"125px"} width={"275px"} style={{padding: "10px 20px 10px 20px"}}/>
              </tr>
              <tr>
                <i style={{display: "inline-grid", width: "275px", padding: "10px 20px 10px 20px"}}>The Boggert</i>
                <i style={{display: "inline-grid", width: "275px", padding: "10px 20px 10px 20px"}}>The Boggert</i>
                <i style={{display: "inline-grid", width: "275px", padding: "10px 20px 10px 20px"}}>The Boggert</i>
              </tr>
            </TabPanel>
            <TabPanel>
            <BadgeList
              currentStudent={currentStudent}
              setCurrentStudent={setCurrentStudent}
              editMode={editMode}
              setEditMode={setEditMode}
              isOwnProfile = {true}
              junkForUpdate = {junkForUpdate}
              updateViaJunk = {updateViaJunk}
              >

              {badgesArr.map(badge => (
                <BadgeToggle key={badge.id} badge={badge} onToggle={handleToggleBadgeVisibility} />
              ))}
            </BadgeList>

            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
