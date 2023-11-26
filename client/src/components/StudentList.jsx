function StudentList(props) {
    // Filter the list based on if the name contains the filter string (case insensitive by making both the name and filter lower case in the back-end)
    const studentList = props.students.filter(student => student.name.toLowerCase().includes(props.searchFilter.toLowerCase()))
    .map(student => {  // create a mapped table of the filtered list
        return (
            // Create onClick listener to capture student id being selected
            <tr key={student.id} onClick={() => {
                props.setSelectedStudent(student.id);
                console.log(student.id);
              }
            }>
              <td>{student.name} </td>
            </tr>
        );
      });
  
    return <>{studentList}</>; // render the table of data
  }
  
  export default StudentList;