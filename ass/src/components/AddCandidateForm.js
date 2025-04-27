import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCandidate } from "../features/candidatesSlice";
import "../components/AddCandidateForm.css";  
import headerImage from '../assets/image.png';

const AddCandidateForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    appliedFor: "",
    skills: [""],
    photo: null,
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e, index = null) => {
    const value = e.target.value;
    const name = e.target.name;
    if (index !== null) {
      const newSkills = [...formData.skills];
      newSkills[index] = value;
      setFormData({ ...formData, skills: newSkills });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.name) errs.name = "Name is required";
    if (!formData.email) errs.email = "Email is required";
    if (!formData.appliedFor) errs.appliedFor = "Applied for is required";
    if (formData.skills.some(skill => skill.trim() === "")) errs.skills = "All skills must be filled";
    if (!formData.photo) errs.photo = "Photo is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const uploadImage = async () => {
    const form = new FormData();
    form.append("image", formData.photo);
    const response = await fetch("https://api.imgbb.com/1/upload?key=de4fdbd90e4f085b319885e95dd7c1c9", {
      method: "POST",
      body: form,
    });
    const data = await response.json();
    return data.data.url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setSuccess(false);
    try {
      const imageUrl = await uploadImage(); // Fetches the URL of the uploaded image
      const candidateData = {
        ...formData, 
        imageUrl,      
        id: new Date().toISOString() 
      };
      dispatch(addCandidate(candidateData));
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        appliedFor: "",
        skills: [""],
        photo: null,
        imageUrl: "",
      });
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setLoading(false);
    }
  };
  

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  return (
    <div className="container">
       <div className="header">
        <div className="image-container">
          <img src={headerImage} alt="Candidate Form" />
        </div>
        <h1>Add New Candidate</h1>
      </div>

      <form onSubmit={handleSubmit} className="candidate-form">
        
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Candidate Name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <select
            name="appliedFor"
            value={formData.appliedFor}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Data Scientist">Data Scientist</option>
          </select>
          {errors.appliedFor && <p className="error">{errors.appliedFor}</p>}
        </div>

        <div className="form-group">
          {formData.skills.map((skill, index) => (
            <div key={index} className="skill-input">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleChange(e, index)}
                placeholder="Skill"
              />
              <button type="button" onClick={() => removeSkill(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addSkill} className="add-skill">
            Add More Skill
          </button>
        </div>

        <div className="form-group">
        <label>Upload Photo :-</label>
          <input
            type="file"
            onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
          />
          {errors.photo && <p className="error">{errors.photo}</p>}
        </div>

        {loading && <p className="loading">Uploading photo, please wait...</p>}
        {success && <p className="success">Candidate added successfully!</p>}

        <div className="form-submit-group">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddCandidateForm;
