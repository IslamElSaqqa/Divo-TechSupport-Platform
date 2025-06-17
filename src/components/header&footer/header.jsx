import classNames from 'classnames';
import ProfileDropdown from "./Profile/ProfileDropdown";
import { useTechnicianContext } from '../../Hooks/Technician/useTechnicianContext';
import { useTechnicianLogout } from '../../Hooks/Technician/useTechnicianLogout';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const isActive = (path) => {
        return window.location.pathname === path;
    };

    const { technician } = useTechnicianContext()
    const { technicianLogout } = useTechnicianLogout()
    const navigate = useNavigate();

    const handleTechnicianLogout = () => { 
        technicianLogout()
        
        setTimeout(() => {
                navigate('/technician-login');
            }, 1000);
    }
    return (
        <header className="header">
        <div className="header-container">
            <a href="/home">
            <img
                src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748886083/e4bkaehxrl0tn4rvl4bt.png"
                alt="Logo"
                className="logo"
            />
            </a>

            <nav className="nav-links">
            <a href="/home" className={classNames("nav-link", { 'active': isActive("/home") })}>Home</a>
            <a href="/online-servicing" className={classNames("nav-link", { 'active': isActive("/online-servicing") })}>Servicing</a>
            <a href="/store" className={classNames("nav-link", { 'active': isActive("/store") || isActive("/store-categories") })}>Store</a>
            <a href="/repair-shops" className={classNames("nav-link", { 'active': isActive("/repair-shops") })}>Repair Shops</a>
            <a href="/windows-errors1" className={classNames("nav-link", { 'active': isActive("/windows-errors1") || isActive("/windows-errors2") })}>Windows Errors</a>
            </nav>

            <div className="right-section">
            <div className="search-container-x">
                {/* Search input (currently commented out) */}
            </div>

            <div className="user-icons">
                <a style={{height:"40px"}} href="/community">
                <img
                    src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748886159/naju8jyvllmtzgjvm30i.png"
                    alt="Community"
                    className="icon-community"
                />
                </a>
                {technician ? (
                    <span onClick={handleTechnicianLogout} className="tech-logout">Logout</span>
                        ) : (<ProfileDropdown />)
                        }
                        
            </div>
            </div>
        </div>
        </header>
    );
    };

export default Header;
