import React from 'react';

import {ProfileSVG} from '../svg/ProfileSVG';
import * as St from './styles';

export const HomeLoggedHeader: React.FC = () => {
  return (
    <St.Container>
      <St.BaseText>
        <St.h5>Oi, Matt</St.h5>
        <St.h2>Bora treinar?</St.h2>
      </St.BaseText>
      <St.BasePhoto>
        <ProfileSVG />
      </St.BasePhoto>
    </St.Container>
  );
};

export default HomeLoggedHeader;
