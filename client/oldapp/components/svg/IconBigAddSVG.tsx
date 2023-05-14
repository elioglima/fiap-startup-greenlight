import React from 'react';
import {View} from 'react-native';
import {Circle, Path, Svg} from 'react-native-svg';

export const IconBigAddSVG = () => {
  return (
    <View>
      <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <Circle cx="25" cy="25" r="18.75" stroke="#222222" stroke-width="3" />
        <Path d="M25 31.25L25 18.75" stroke="#222222" stroke-width="3" stroke-linecap="square" />
        <Path d="M31.25 25L18.75 25" stroke="#222222" stroke-width="3" stroke-linecap="square" />
      </Svg>
    </View>
  );
};

export default IconBigAddSVG;
