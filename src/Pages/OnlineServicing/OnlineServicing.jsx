import React, { useRef, useState } from "react";
import { useOnlineService } from "../../Hooks/OnlineServicing/useOnlineSevice";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const OnlineServicing = () => {
  const [refId, setRefId] = useState("");
  const [steps, setSteps] = useState("");
  const [description, setDescription] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [uploading, setUploading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [agreed, setAgreed] = useState(false);


  const { isLoading, error, createOnlineService } = useOnlineService();
  const { user } = useAuthContext();
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
 

    if (!user) {
      setAuthError("Please log in to continue.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }
    // const selectedSpecialistId = "67d889a81a9fb45d5d583a19"
    const sessionData = {
      user: user._id,
      // specialist: selectedSpecialistId,
      instapay_reference: refId,
      steps: steps,
      description: description,
      image_url: imageUpload,
    };
    const success = await createOnlineService(sessionData);

    if (success) {
      console.log("Session created successfully");
      setTimeout(() => {
        navigate("/online-servicing/request-success");
      }, 1500);
    } else {
      console.error("Failed to create session");
    }
  };

  // handle File change on click!
  const handleFileChange = async (event) => {
    if (!user) {
      setAuthError("Please log in to continue.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const response = await fetch("/api/uploadImage/toCloudinary", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      // Store the Cloudinary image URL
      setImageUpload(data.imageUrl);
    } catch (err) {
      console.error("Upload error:", err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="content-container">
      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Online Servicing</h1>

          {/*  check  user logged in or not*/}
          {authError && <div className="error">{authError}</div>}

          {error && <div className="error">{error}</div>}

          <label>Reference Id*</label>
          <div className="search-container2">
            <input
              type="text"
              className="search-input"
              value={refId}
              onChange={(e) => setRefId(e.target.value)}
            />
          </div>

          <label>Describe the issue/bug*</label>
          <div className="search-container2">
            <input
              type="text"
              className="search-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <label>Upload media you like to share (png,jpg)*</label>
          <div className="search-container2">
            <input
              type="file"
              accept=".png,.jpg"
              className="file-input"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="uploadImage"
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              {uploading ? "Uploading..." : "📁"}
            </button>
            {imageUpload && (
              <span style={{ color: "green", marginLeft: "1rem" }}>
                Uploaded ✅
              </span>
            )}
          </div>

          <label>Steps to re-create the issue/bug*</label>
          <div className="search-container2">
            <input
              type="text"
              className="search-input"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
          </div>

          <div className="terms-section">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="terms">Agree to Terms and Conditions</label>
          </div>

          <div className="button-group">
            <button disabled={isLoading || !agreed} className="submit-btn">
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      <div className="qr-section">
        <img
          src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748902370/k0aibm0dsbkcdw5bsp6e.png"
          alt="QR Code"
          className="qr-image"
        />
        <div className="fee-info">
          <span>Application Fee:</span>
          <span className="fee-amount">100 EGP</span>
          <img
            src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748902453/yqqp8tpifnhlkzsdn3e8.png"
            alt="info"
            className="info-icon-small"
          />
        </div>
      </div>
    </div>
  );
};

export default OnlineServicing;
