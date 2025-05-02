import React, { useState, useEffect, useRef } from 'react';
import { useCreatePost } from '../../Hooks/Community/useCreatePost';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const [content, setContent] = useState('');
  const [imageUpload, setImageUpload] = useState('');
  const [uploading, setUploading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [posts, setPosts] = useState([]);
  const { isLoading, error, createPost } = useCreatePost();
  const { user } = useAuthContext();
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setAuthError('Please log in to continue.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const postData = {
      user: user._id,
      content,
      image_url: imageUpload,
    };

    const success = await createPost(postData);
    if (success) {
      setContent('');
      setImageUpload('');
      const res = await fetch('/api/community/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : data.posts || []);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const response = await fetch('/api/uploadImage/toCloudinary', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Upload failed');
      setImageUpload(data.imageUrl);
    } catch (err) {
      console.error('Upload error:', err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="content-container">
      <main className="main-content">
        {authError && <div className="error">{authError}</div>}
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="create-post">
            <div className="top">
              <div className="user-text">
                <img
                  src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/avatar.png"
                  alt="Avatar"
                  className="avatar"
                />
                <textarea
                  rows={4}
                  type="text"
                  placeholder="What's on your mind?"
                  className="text-Community"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Post image preview under textarea */}
              {imageUpload && (
                <div className="post-preview-image">
                  <img src={imageUpload} alt="Post preview" className="post-image" />
                </div>
              )}
            </div>

            <div className="actions-button">
              <div className="actions">
                <button
                  className="action-btn"
                  onClick={() => fileInputRef.current.click()}
                  disabled={uploading}
                >
                  <img
                    src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/image.png"
                    alt="Image"
                  />
                </button>
                <input
                  type="file"
                  accept=".png,.jpg"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />

                <button className="action-btn" type="button">
                  <img
                    src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/emoji.png"
                    alt="Emoji"
                  />
                </button>
              </div>
              <button disabled={ isLoading} className="post-btn" type="submit">Post</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Community;
