import React, { useState, useEffect } from 'react';
import Search from '../../components/Search.jsx';
import { getAllStudents, searchStudentsByName } from '../../Utils/requests.js';

function SearchProfile({ data }) {
  const [filterText, setFilterText] = useState('');
  const [allStudents, setAllStudents] = useState([]);

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
    const { data: filteredStudents, err } = await searchStudentsByName(filterText);

    if (err) {
      console.error(err);
    }

    // Process filtered students as needed
  };

  // call the searchAndUpdate function when filterText changes
  useEffect(() => {
    searchAndUpdate();
  }, [filterText]);

  return (
    <div className="bg">
      <div className="row">
        <h1>UF Directory App</h1>
      </div>
      <Search filterUpdate={filterUpdate} />
      <main>
        <div className="row">
          <div className="column1">
            {/* List of students */}
            <ul>
              {allStudents.map((student) => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
          </div>
          {/* Figure out other components */}
        </div>
      </main>
    </div>
  );
}

export default SearchProfile;
