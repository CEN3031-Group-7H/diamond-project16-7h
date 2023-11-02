import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabPanel, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.less';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { useGlobalState } from '../../Utils/userState';
import { getCurrentStudents, getStudent, getStudentClassroom } from '../../Utils/requests';
import './StudentProfile.less';
import './BadgeList.jsx'

function StudentProfile() {

  const [selectedTab, setSelectedTab] = useState(0);
  const [currentStudent, setCurrentStudent] = useState();
  const [editMode, setEditMode] = useState(false)

  // Get the currently logged in student
  getCurrentStudents().then((res) => {
      if (res.data) {
        setCurrentStudent(res.data.students[0]);
      } else {
        message.error(res.err);
      }
    });

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
              {/* BadgeList(currentStudent.id, editMode) */}
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
