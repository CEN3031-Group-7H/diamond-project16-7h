import React, { useRef } from 'react';

function Search({ filterUpdate }) {
  const inputRef = useRef(null);

  function handleChange() {
    const inputValue = inputRef.current.value;
    filterUpdate(inputValue);
  }

  return (
    <form>
      <input 
        type="text"
        placeholder="Type to Filter"
        ref={inputRef}
        onChange={handleChange}
      />
    </form>
  );
}

export default Search;
