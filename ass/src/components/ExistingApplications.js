import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./ExistingApplications.css";

const ExistingApplications = () => {
  const candidates = useSelector((state) => state.candidates.candidates);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };


  const filteredCandidates = candidates.filter(
    (candidate) =>
      
      candidate.name.toLowerCase().includes(searchTerm) ||
      candidate.appliedFor.toLowerCase().includes(searchTerm) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm))
  );

  return (
    <div className="view-candidates-container">
      <input
        type="text"
        placeholder="Search Candidates...by name, applied for or skill"
        value={searchTerm}
        onChange={handleChange}
        className="search-box"
      />
      
      {filteredCandidates.map((candidate) => (
        <div key={candidate.id} className="candidate-container">
          {" "}

          <h2>{candidate.name}</h2>
          <p>Applied for: {candidate.appliedFor}</p>
          <ul>
            {candidate.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          {candidate.imageUrl && (
            <img
              src={candidate.imageUrl}
              alt={`${candidate.name}'s profile`}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                margin: "10px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ExistingApplications;
