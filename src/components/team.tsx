import React from 'react';

import '../style/reset.scss';
import '../style/style.scss';
import Profile from "../components/profile";

const Team: React.FC = () => (
  <>
    <div className="team-wrapper">
      <ul className="team">
        <li className="team-item">
          <Profile
            image={'https://s3.ap-northeast-2.amazonaws.com/podo.world/red.png'}
            name={'김희범'}
            role={'Mobile Engineer'}
            description={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'}
            color={'red'}
          />
        </li>
        <li className="team-item">
          <Profile
            image={'https://s3.ap-northeast-2.amazonaws.com/podo.world/green.png'}
            name={'한정'}
            role={'Front-end'}
            description={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'}
            color={'green'}
          />
        </li>
        <li className="team-item">
          <Profile
            image={'https://s3.ap-northeast-2.amazonaws.com/podo.world/doggy.png'}
            name={'한유덕'}
            role={'Front-end'}
            description={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'}
            color={'beige'}
          />
        </li>
        <li className="team-item">
          <Profile
            image={'https://s3.ap-northeast-2.amazonaws.com/podo.world/pink.png'}
            name={'전해성'}
            role={'Back-end'}
            description={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'}
            color={'pink'}
          />
        </li>
        <li className="team-item">
          <Profile
            image={'https://s3.ap-northeast-2.amazonaws.com/podo.world/purple.png'}
            name={'김자영'}
            role={'Designer'}
            description={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'}
            color={'purple'}
          />
        </li>
      </ul>
    </div>
  </>
);

export default Team;
