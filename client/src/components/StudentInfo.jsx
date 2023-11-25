import { message } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import { getStudent } from '../Utils/requests';

function StudentInfo(props) {

    const [studentInfo, setStudentInfo] = useState(null);

    // Find the corresponding data based off the selected student's id and display its data (if there is one selected)
    if(props.selectedStudent && (!studentInfo || (props.selectedStudent != studentInfo.id))) {
        getStudent(props.selectedStudent).then((res) => {
            if(res.data) {
                setStudentInfo(res.data);
                console.log(res.data);
            } else {
                message.error(res.err);
            }
        });
    }
    return (
      <div>
        <i>Click on a name to view more information</i>
        <p></p>
        <div>
          {/* Print info if it exists */}
          <>{ studentInfo &&
            <div> {/* Container for student info */}
              <p>Name: {studentInfo.name}</p>
              <p>Member Since: {studentInfo.created_at.substring(0,studentInfo.created_at.indexOf("T"))}</p>
              {/* Print badges if they exist */}
              <div className='badge-grid'>
                { studentInfo.badges && 
                    studentInfo.badges.map((badge, index) => {
                      // Skip rendering if the badge is hidden for that student
                      if (studentInfo.profileData && studentInfo.profileData.hiddenBadges && studentInfo.profileData.hiddenBadges.includes( badge.id )) {
                        return null;
                      } else {
                        return (
                        <div key={index} className="badge-item">
                        {badge.image_url && (
                        <img className="badge-icon" src={badge.image_url} alt={badge.name} />
                        )}
                        {badge.name && (
                        <p className="badge-name">{badge.name}</p>
                        )}
                        </div>
                        );
                      }
                    })
                }
              </div>
            </div>
          }</> {/* End of student info */}
        </div>
      </div>
    );
  }
  
  export default StudentInfo;