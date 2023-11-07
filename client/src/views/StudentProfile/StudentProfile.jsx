import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabPanel, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.less';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { useGlobalState } from '../../Utils/userState';
import { getCurrentStudents, getStudents, getStudentClassroom } from '../../Utils/requests';
import './StudentProfile.less';
import './BadgeList.jsx';

function StudentProfile() {

  const [currentStudent, setCurrentStudent] = useState();
  const [badgesArr, setBadgesArr] = useState([]);  
  const [editMode, setEditMode] = useState(false);

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

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='activity-container'>
        <div id='header'>
            <div>Welcome {!(currentStudent == null) ? currentStudent.name : ''} {!(currentStudent == null) ? currentStudent.character : ''}</div>
        </div>
        <div>
          <Tabs>
            <TabList align='start'>
              <Tab>Featured Projects</Tab>
              <Tab>Earned Badges</Tab>
            </TabList>
            <TabPanel>
              Featured Projects Go Here
            </TabPanel>
            <TabPanel>
              <div>{!(currentStudent == null) ? badgesArr.map((name) => <p>{name}</p>) : ''}</div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
