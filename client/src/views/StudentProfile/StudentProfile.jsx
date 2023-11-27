import { message } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import { Tab, Tabs, TabPanel, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.less';
import NavBar from '../../components/NavBar/NavBar';
import { getCurrentStudents, updateBadgeVisibility, getStudents, getStudentClassroom } from '../../Utils/requests';
import './StudentProfile.less';
import BadgeList from '../BadgeList/BadgeList.jsx';
import BadgeToggle from '../../components/BadgeToggle.jsx';
import Search from '../../components/Search.jsx';
import StudentList from '../../components/StudentList.jsx';
import StudentInfo from '../../components/StudentInfo.jsx';


function StudentProfile() {

  const [currentStudent, setCurrentStudent] = useState(null);
  const [studentsInClassroom, setStudentsInClassroom] = useState([]);
  const [badgesArr, setBadgesArr] = useState([]);  
  const [editMode, setEditMode] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedStudent, setSelectedStudent] = useState();

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

        getStudentClassroom().then((res) => {
          if (res.data.classroom) {
            // Get the students in the classroom
            const classroomCode = res.data.classroom.code;
            getStudents(classroomCode).then((res) => {
              if(res.data) {
                setStudentsInClassroom(res.data);
                console.log(res.data);
              } else {
                message.error(res.error);
              }
            });
          } else {
            message.error(res.err);
          }
        });
      } else {
        message.error(res.err);
      }
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
              <Tab>Classmates</Tab>
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
              >
            </BadgeList>
            </TabPanel>
            <TabPanel>
              <Search
                filterUpdate={setSearchFilter}
              />
              <StudentList
                students={studentsInClassroom}
                searchFilter={searchFilter}
                setSelectedStudent={setSelectedStudent}
              />
              <StudentInfo
                students={studentsInClassroom}
                selectedStudent={selectedStudent}
              />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;