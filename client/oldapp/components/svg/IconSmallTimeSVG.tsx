import {EColors} from 'domain/enum/EColors';
import React from 'react';
import {View} from 'react-native';
import {Circle, Path, Svg} from 'react-native-svg';

interface props {
  color?: EColors;
}

export const IconSmallTimeSVG = ({color = EColors.white}: props) => {
  return (
    <View>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="8.5" stroke={color} />
        <Path
          d="M16.5 12H12.25C12.1119 12 12 11.8881 12 11.75V8.5"
          stroke={color}
          stroke-linecap="round"
        />
      </Svg>
    </View>
  );
};
