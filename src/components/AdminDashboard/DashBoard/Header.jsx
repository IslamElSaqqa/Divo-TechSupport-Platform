import React from 'react';
import styles from './Header.module.css';

const Header = ({ userName = "Admin", userImage = "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748905719/ensi2zlpwkwbs6m3kjlx.png" }) => {
  return (
    <header className={styles.header}>
      <div className={styles.profile}>
        <img 
          src={userImage} 
          alt="Profile" 
          className={styles.profileImage}
        />
        <span className={styles.userName}>{userName}</span>
        <img 
          src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748905779/vjaaueyy3fl0oukovxki.png" 
          alt="Chevron Down" 
          className={styles.chevron}
        />
      </div>
    </header>
  );
};

export default Header;

