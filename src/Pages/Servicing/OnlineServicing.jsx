import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const OnlineServicing = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    referenceId: '',
    description: '',
    steps: '',
    file:null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      file: file
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/request-success");
  };

  return (
    <div className="content-container">
      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Online Servicing</h1>

          <label>Reference Id*</label>
          <div className="search-container2">
            <input
              type="text"
              className="search-input"
              name="referenceId"
              value={formData.referenceId}
              onChange={handleInputChange}
            />
          </div>

          <label>Describe the issue/bug*</label>
          <div className="search-container2">
            <input
              type="text"
              className="search-input"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <label>Upload media you like to share (png,jpg)*</label>
          <div className="search-container2">
            <input type="file" accept=".png,.jpg" className="file-input" onChange={handleFileChange} />
            <button type="button" className="uploadImage" style={{ border: "none", background: "transparent", cursor: "pointer" }}>📁</button>
          </div>

          <label>Steps to re-create the issue/bug*</label>
          <div className="search-container2">
            <input
              type="text"
              className="search-input"
              name="steps"
              value={formData.steps}
              onChange={handleInputChange}
            />
          </div>

          <div className="terms-section">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">Agree on terms and Condition</label>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="instapay-btn">Get Instapay link</button>
          </div>
        </form>
      </div>

      <div className="qr-section">
        <img src="https://dashboard.codeparrot.ai/api/image/Z89hh-d_tb-16vFL/c-0733554.png" alt="QR Code" className="qr-image" />
        <div className="fee-info">
          <span>Application Fee:</span>
          <span className="fee-amount">100 EGP</span>
          <img src="https://dashboard.codeparrot.ai/api/image/Z89hh-d_tb-16vFL/vector.png" alt="info" className="info-icon-small" />
        </div>
      </div>
    </div>
  );
};

export default OnlineServicing;
