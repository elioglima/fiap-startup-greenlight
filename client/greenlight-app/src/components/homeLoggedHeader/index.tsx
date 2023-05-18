import React from 'react';

import {TAppState} from '@app/store';
import {ProfileSVG} from '@components/svg/ProfileSVG';
import {useSelector} from 'react-redux';
import * as St from './styles';

export const HomeLoggedHeader: React.FC = () => {
  const stateLogin = useSelector((state: TAppState) => state.login);

  return (
    <St.Container>
      <St.BaseText>
        <St.h5>Oi, {`${stateLogin.response?.user?.nome}`}</St.h5>
        <St.h2>Bora treinar?</St.h2>
      </St.BaseText>
      <St.BasePhoto>
        <ProfileSVG />
      </St.BasePhoto>
    </St.Container>
  );
};

export default HomeLoggedHeader;
