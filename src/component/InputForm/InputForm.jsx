import React, { useState } from 'react';

const InputForm = ({ vertices }) => {
  const [lengths, setLengths] = useState([]);

  const handleChange = (index, value) => {
    let newLengths = [...lengths];
    newLengths[index] = value;
    setLengths(newLengths);
  };

  const calculateArea = () => {
    // Implement area calculation logic here
    // For simplicity, assume lengths are given in the correct order
  };

  return (
    <div>
      {vertices.map((vertex, index) => (
        <div key={index}>
          <label>Length {index + 1}: </label>
          <input type="number" onChange={(e) => handleChange(index, e.target.value)} />
        </div>
      ))}
      <button onClick={calculateArea}>Calculate Area</button>
    </div>
  );
};

export default InputForm;
