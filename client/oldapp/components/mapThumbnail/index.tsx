import React from 'react';

import {MapSampleSVG} from '../svg/MapSampleSVG';
import * as St from './styles';

export const MapThumbnail: React.FC = () => {
  return (
    <St.Container>
      <MapSampleSVG />
    </St.Container>
  );
};

export default MapThumbnail;
