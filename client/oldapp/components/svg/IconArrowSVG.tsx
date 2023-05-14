import React from 'react';
import {View} from 'react-native';
import {Path, Svg} from 'react-native-svg';

export const IconArrowSVG = () => {
  return (
    <View>
      <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <Path d="M31.25 12.5L18.75 25L31.25 37.5" stroke="#222222" stroke-width="3" />
      </Svg>
    </View>
  );
};

export default IconArrowSVG;
