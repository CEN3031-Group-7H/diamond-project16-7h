import React, { useState, useEffect } from 'react';
import Search from '../../components/Search.jsx';
import { getAllStudents, searchStudentsByName } from '../../Utils/requests.js';

function SearchProfile({ data }) {
  const [filterText, setFilterText] = useState('');
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    // fetch all students
    const fetchAllStudents = async () => {
      const { data: fetchedStudents, err } = await getAllStudents();

      if (err) {
        console.error(err);
      } else {
        // set fetched students in the state
        setAllStudents(fetchedStudents || []);
      }
    };

    fetchAllStudents();
  }, []);

  async function filterUpdate(value) {
    setFilterText(value);
  }

  // use the searchStudentsByName function to get filtered students
  const searchAndUpdate = async () => {
    const { data: newFilteredStudents, err } = await searchStudentsByName(filterText);

    if (err) {
      console.error(err);
    } else {
      // set filtered students in the state
      setFilteredStudents(newFilteredStudents || []);
    }
  };

  // call the searchAndUpdate function when filterText changes
  useEffect(() => {
    searchAndUpdate();
  }, [filterText]);

  const studentsToDisplay = filterText ? filteredStudents : allStudents;

  return (
    <div className="bg">
      <div className="row">
        <h1>Search Classmates</h1>
      </div>
      <Search filterUpdate={filterUpdate} />
      <main>
        <div className="row">
          <div className="column1">
            {/* List of students */}
            <ul>
              {studentsToDisplay.length > 0 ? (
                studentsToDisplay.map((student) => (
                  <li key={student.id}>{student.name}</li>
                ))
              ) : (
                <li>No students found</li>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SearchProfile;
