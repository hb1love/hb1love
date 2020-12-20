import React from 'react';

import '../style/reset.scss';
import '../style/style.scss';

interface ProfileProps {
  image: string;
  name: string;
  role: string;
  description: string;
  color: string;
}

const Profile: React.FC<ProfileProps> = ({ image, name, role, description, color }) => (
  <>
    <div className={`profile profile_${color}`}>
      <img src={image} />
      <div className="profile-contents">
        <h2>{name} <span>{role}</span></h2>
        <p>{description}</p>
      </div>
    </div>
  </>
);

export default Profile;
