import React from 'react';

const CreatePost = () => {
  return (
    <div className="create-post">
      <div className="top">
        <div className="user-text">
          <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/avatar.png" alt="Avatar" className="avatar" />
          <input type="text" placeholder="What's on your mind?" className="text-Community" />
        </div>
      </div>
      <div className="actions-button">
        <div className="actions">
          <button className="action-btn">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/image.png" alt="" />
          </button>
          <button className="action-btn">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/gif.png" alt="GIF" />
          </button>
          <button className="action-btn">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/emoji.png" alt="Emoji" />
          </button>
        </div>
        <button className="post-btn">Post</button>
      </div>
    </div>
  );
};


const SocialMediaPost = ({
  username = "X_AE_A-13",
  userRole = "Product Designer, slothUI",
  content = "What do U think ?",
  image = "https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/frame.png",
  likes = 12,
  comments = 25,
  shares = 187
}) => {
  return (
    <div className="social-post">
      <div className="post-header">
        <div className="user-info">
          <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/avatar-2.png" alt="User avatar" className="avatar" />
          <div className="user-details">
            <h3 className="username">{username}</h3>
            <p className="user-role">{userRole}</p>
          </div>
        </div>
        <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/dots-thre.png" alt="Menu" className="menu-icon" />
      </div>

      <div className="post-content">
        <p className="content-text">{content}   <span className="orange-text">#mynewsetup</span></p>
        <img src={image} alt="Post content" className="content-image" />
      </div>

      <div className="post-stats">
        <div className="stats-group">
          <div className="stat-item">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/thumbs-up.png" alt="Like" />
            <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/vector.png" alt="Heart" className="heart-icon" />
            <span>{likes} Likes</span>
          </div>
          <div className="stat-item">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/chat-dots.png" alt="Comment" />
            <span>{comments} Comments</span>
          </div>
          <div className="stat-item">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/share-fat.png" alt="Share" />
            <span>{shares} Share</span>
          </div>
        </div>
        <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/bookmark.png" alt="Bookmark" className="bookmark-icon" />
      </div>

      <div className="post-comment">
        <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/avatar-3.png" alt="User avatar" className="avatar" />
        <input type="text" placeholder="Write your comment.." className="comment-input" />
        <div className="comment-actions">
          <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/monotone.png" alt="Action 1" className="action-icon" />
          <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/monotone-2.png" alt="Action 2" className="action-icon" />
          <img src="https://dashboard.codeparrot.ai/api/image/Z9SwAyppvFKitUIo/monotone-3.png" alt="Action 3" className="action-icon" />
        </div>
      </div>
    </div>
  );
};



const Community = () => {
  return (
    <div className="content-container">
      <main className="main-content">
        <CreatePost />
        <SocialMediaPost />
      </main>
    </div>
  );
};

export default Community;
