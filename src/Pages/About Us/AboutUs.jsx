
import { useState, useRef } from 'react';
import './AboutUs.css';

export default function AboutUs() {
  const [activeFounder, setActiveFounder] = useState(null);
  const slidesContainerRef = useRef(null);
  
  const founders = [
    { id: 1, image: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1746733319/shawky_r14hxu.jpg", name: "Ahmed Shawky", role: "Team Leader" },
    { id: 2, image: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1746733319/islam_xj0utg.jpg", name: "Islam Ashraf" },
    { id: 3, image: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1746733319/abdelrehem_flqrkn.jpg", name: "Abdelrahim Ahmed" },
    { id: 4, image: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1746733319/omar_bgxp9f.jpg", name: "Omar Yasser" },
    { id: 5, image: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1746733326/mahmoud_oorequ.jpg", name: "Mahmoud Shoaib" },
    { id: 6, image: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1746733318/hany_bcmz7j.jpg", name: "Hany Elsayed" },
  ];

  return (
    <div className="about-us-container">
      <h1 className="title">Our Story</h1>
      <div className="story-section">
        
        
        <div className="story-content">
          <p>
            Launched in 2024, Divo is Egypt's first smart platform dedicated to laptop repair
            and support, with an active presence in alexandria. Focused on convenience and
            innovation, Divo connects users with verified laptop repair shops, essential parts,
            and remote troubleshooting services.
          </p>
          <p>
            With a growing network of trusted partners and service providers, Divo supports
            thousands of users and continues to expand across the region.
          </p>
          <p>
            Divo offers a wide range of services—from part-finding and online diagnostics to a
            vibrant tech community. Our mission is to make laptop care simple, fast, and
            accessible for everyone.
          </p>
        </div>
        
      </div>

    
      <div className="founders-section">
        <h2 className="subtitle">Founded by</h2>
        
        <div className="founders-grid">
          {founders.map((founder) => (
            <div 
              key={founder.id} 
              className={`founder-item ${activeFounder === founder.id ? 'active' : ''}`}
              onClick={() => setActiveFounder(activeFounder === founder.id ? null : founder.id)}
            >
              <div className="founder-image-container">
                <img 
                  src={founder.image} 
                  alt={founder.name}
                  className="founder-image" 
                />
              </div>
              <div className="founder-name">
                {founder.name}
              </div>
              {founder.role && <div className="founder-role">{founder.role}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}