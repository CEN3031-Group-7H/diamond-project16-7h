import { message } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import { getStudent } from '../Utils/requests';

function StudentInfo(props) {

    const [studentInfo, setStudentInfo] = useState(null);

    // Find the corresponding data based off the selected student's id and display its data (if there is one selected)
    if(props.selectedStudent) {
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
        <div>
          {/* Print info if it exists */}
          <>{ studentInfo &&
            <div> {/* Container for student info */}
              <p>Name: {studentInfo.name}</p>
              {/* Print badges if they exist */}
              <>{ studentInfo.badges &&
                <p>Badges: {studentInfo.badges}</p>
                }
              </>
            </div>
          }</> {/* End of student info */}
        </div>
      </div>
    );
  }
  
  export default StudentInfo;