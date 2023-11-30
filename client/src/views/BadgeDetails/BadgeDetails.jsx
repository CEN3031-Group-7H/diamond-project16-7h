import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getBadge, getClassroom, getClassroomSize, getBadgeEarnCt, updateBadge, assignBadge, unassignBadge} from '../../Utils/requests';
import './BadgeDetails.less';


/**
 * @param {int} classId  The id of the classroom we are calculating stats relative to
 * @param {int} badgeId  The if of the badge we want to get earnage numbers for
 * @returns {string}                The string we display to the student
 */
 async function getPercentMessage(classId, badgeId) {
  try {
    console.log("getting PEM ids: " + classId + " " + badgeId);
    
    const earnedRes = await getBadgeEarnCt(badgeId);
    
    if (earnedRes.data) {
      const earnedCt = earnedRes.data.count;
      const totalRes = await getClassroomSize(classId);

      if (totalRes.data) {
        const classroomsize = totalRes.data.count;

        let percentage, message;

        if (classroomsize < 1) {
          percentage = -1;
          message = 'Uh oh! This badge is in an empty classroom!';
        } else if (earnedCt == 0) {
          percentage = 0;
          message = 'No students in this class have earned this badge yet';
        } else if (earnedCt == 1) {
          percentage = Math.round(100 / classroomsize);
          message = 'Only one student has earned this badge!';
        } else {
          percentage = Math.round((earnedCt / classroomsize) * 100);
          message = percentage + '% of students in your class have earned this badge';
        }

        return { percentage, message };
      } else {
        console.log(totalRes.err);
        return { percentage: 0, message: "Failed to Fetch classroom size" };
      }
    } else {
      console.log(earnedRes.err);
      return { percentage: 0, message: "Failed to Fetch number of students earned" };
    }
  } catch (error) {
    console.error(error);
    return { percentage: 0, message: "An error occurred" };
  }
}

/**
 * @param {collection} badge        The id of the badge whose information is being requested
 */
const MainBadgeInfo = ({ badgeToDisp, stats, setStats }) => {
    /*
    getBadge(badgeId).then((res) => {
        if (res.data) {
          const badgeToDisp = res.data
          return(
            <div id='activity-container'>
                <div id='header'>
                    <div>{badgeToDisp.name}</div>
                </div>
                <div id='badge-image' >
                    <img src={badgeToDisp.image_url} alt={badgeToDisp.name} />
                </div>
                <div id='badge-description' >
                    <div>{badgeToDisp.description}</div>
                </div>
                <div id='earned-percent-bar' >
                    <div>{writePercentEarnedMessage(badgeToDisp)}</div>
                </div>
            </div>
        )
        } else {
          return (
              <div>
                  <div className="missingInfoRectangle">Failed to fetch Badge information.</div>
              </div>
          )
        }
      });
      */
    //see ../../../../server/api/badge/documentation/badge.json
    console.log(badgeToDisp, badgeToDisp.id);
    if(!(badgeToDisp==null) && badgeToDisp != {} && !(badgeToDisp.id==null)){

      useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await getPercentMessage(badgeToDisp.classroom, badgeToDisp.id);
            setStats(result);
          } catch (error) {
            console.error(error);
            setStats({percentage:0, message:"An error occured when getting the percent earned"})
          }
        };
    
        fetchData();
      }, []); // Empty dependency array to run the effect only once
        //const stats = {message: "Percentage fetching not yet implemented", percentEarned: 0}
        return(
            <div>
                {badgeToDisp.name && (
                <div id='header'>
                    <div>{badgeToDisp.name}</div>
                </div>
                )}

                {badgeToDisp.image_url && (
                <div id='badge-image' >
                    <img src={badgeToDisp.image_url} alt={badgeToDisp.name} />
                </div>
                )}
                
                {badgeToDisp.description && (
                <div id='badge-description' >
                    <div>{badgeToDisp.description}</div>
                </div>
                )}
                {stats ? (
                  <div className='earned-percent-container'>
                    <div className="earned-percent-bar" style={{
                      width: `${stats.percentage}%`,
                      height: '100%',
                      backgroundColor: '#5BABDE',
                      textAlign: 'center',
                      lineHeight: '30px'
                    }}> {/*stlyes from the css arent applying so i had to at least put this one for the demo */}
                      {stats.percentage}%
                    </div>
                  </div>
                ) : (
                  <p>Loading Percentage...</p>
                )}
                {stats && stats.message ? (
                    <div id='earned-percent-message'>
                        <div>{stats.message}</div>
                    </div>
                ) : (
                  <p>Loading Percentage Message...</p>
                )}
            </div>
        )
    } else {
        return (
            <div>
                <div className="missingInfoRectangle">Failed to fetch Badge information.</div>
            </div>
        )
    }
    
}
/**
 * 
 * @param {int} classId
 * @param {int} badgeId
 * @param {useState} classStudents_setClassStudents
 * @param {useState} setOriginallyEarned
 * @param {useState} setHasToggled
 */
const setupTeacherView = ({classId, badgeId, classStudents, setClassStudents, setOriginallyEarned, setHasToggled}) => {
  //make a requrest to get students in classroom
  console.log(classId);
  getClassroom(classId).then((resClass)=>{
    if(resClass.data){
      setClassStudents(resClass.data.students);

      //make a request to get students who have earned the badge
      getBadge(badgeId).then((resBadge)=>{
        const earnedStudents = resBadge.students;
        let earnedData = [];
        if(resBadge.data){

          classStudents.array.forEach(student => {
            if(earnedStudents.find(student.id)){
              earnedData.push(true);
            }
            else{
              earnedData.push(false);
            }
          });
          setOriginallyEarned(earnedData);
          setHasToggled(new Array(earnedData.length).fill(false))
        }
        else{
          message.error(resBadge.error);
        }
      })
    }
    else{
      message.error(resClass.error);
    }
  })
}

const TeacherOnlyBadgeInfo = ({badgeId, classStudents, originallyEarned, hasToggled, setHasToggled})=>{

  function toggleStudentEarnship(index){
    let hasToggledTemp = [...hasToggled];
    hasToggledTemp[index] = !hasToggled[index];
    setHasToggled(hasToggledTemp);
  }
  console.log(classStudents);

  const studentTable = classStudents.map((student, i) => {
    return (
        <div>
          <tr key={i}>
            <td>{student.name} </td>
            <td><button
              onClick ={() => toggleStudentEarnship(i)}
              className = {( originallyEarned[i] ? !hasToggled[i] : hasToggled[i] ) ?
                          "checked-box":
                          "unchecked-box"} >
            </button></td>{/*just directly display true/false for now, will make checkbox eventually */}
          </tr>
        </div>
    );
  });

  return (
    <div>
      <>{studentTable}</>
      <button onClick={() => applyChanges(badgeId, classStudents, originallyEarned, hasToggled)}>💾</button>
    </div>
  );

  //as teacher checks and unchecks students, add changes to some 
  
}

function applyChanges(badgeId, classStudents, originallyEarned, hasToggled){
  //make api calls for each true value in hasToggled to assign/unassign student based on value in originallyEarned
  hasToggled.map((studentHasToggled, i) =>{
    if(studentHasToggled){
      console.log(classStudents[i].id)
      if(originallyEarned[i]){
        unassignBadge(badgeId, classStudents[i].id);
      }
      else{
        assignBadge(badgeId, classStudents[i].id);
      }
    }
  })
}


/**
 * @param {collection} badge        The badge whose information is being requested
 */
 const BadgeDetails = ({ isOpen, onRequestClose, selectedBadge, teacherView }) => {
     console.log(selectedBadge)


     const [classStudents, setClassStudents] = useState([]); //students in the classroom
     const [originallyEarned, setOriginallyEarned] = useState([]); //bool of whether the student had earned the badge when the page loaded
     const [hasToggled, setHasToggled] = useState([]); //bool of whether the teacher has changed the badge earnership of the corresponding student
     const [stats, setStats] = useState(null); //stuff about percent of classrom which has earned


    if(teacherView && selectedBadge.id && selectedBadge.classroom && !(classStudents && classStudents.length > 0)) {
      console.log("getting class info")
      setupTeacherView({
        classId : selectedBadge.classroom, 
        badgeId : selectedBadge.id, 
        classStudents : classStudents, 
        setClassStudents : setClassStudents, 
        setOriginallyEarned : setOriginallyEarned, 
        setHasToggled : setHasToggled
      })
    }

    return (
      <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Badge Details Popup"
      >
        <div style={{ position: 'relative' }}>
          <div>
            <MainBadgeInfo badgeToDisp = {selectedBadge} stats={stats} setStats={setStats}/>
          </div>
          <div>
            {teacherView &&(
              <TeacherOnlyBadgeInfo 
                badgeId = {selectedBadge.id}
                classStudents = {classStudents}
                originallyEarned = {originallyEarned}
                hasToggled = {hasToggled}
                setHasToggled = {setHasToggled}
              />
            )}
          </div>
          <button
            onClick={onRequestClose}
            style={{
              position: 'absolute',
              top: '100px',
              right: '10px',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#3498db', // Blue color
              color: '#ffffff', // White color
              border: 'none',
              cursor: 'pointer',
            }}
          >
            X
          </button>
        </div>
      </Modal>
    );
  };

export default BadgeDetails;