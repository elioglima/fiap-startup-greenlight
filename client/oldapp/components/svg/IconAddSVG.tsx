import React from 'react';
import {View} from 'react-native';
import {Circle, Path, Svg} from 'react-native-svg';

export const IconAddSVG = () => {
  return (
    <View>
      <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <Circle cx="20" cy="20" r="15" fill="#227D8F" fill-opacity="0.3" />
        <Path d="M20 13.3333L20 26.6667" stroke="white" stroke-width="3" stroke-linecap="round" />
        <Path d="M26.6667 20L13.3334 20" stroke="white" stroke-width="3" stroke-linecap="round" />
      </Svg>
    </View>
  );
};

export default IconAddSVG;
