import React from 'react';
import styles from './Header.module.css';

const Header = ({ userName = "Derek Alvarado", userImage = "https://dashboard.codeparrot.ai/api/image/Z9NwpippvFKitUFI/rectangl.png" }) => {
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
          src="https://dashboard.codeparrot.ai/api/image/Z9NwpippvFKitUFI/chevron.png" 
          alt="Chevron Down" 
          className={styles.chevron}
        />
      </div>
    </header>
  );
};

export default Header;

