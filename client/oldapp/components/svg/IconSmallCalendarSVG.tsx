import {EColors} from 'domain/enum/EColors';
import React from 'react';
import {View} from 'react-native';
import {Path, Rect, Svg} from 'react-native-svg';

interface props {
  color?: EColors;
}

export const IconSmallCalendarSVG = ({color = EColors.white}: props) => {
  return (
    <View>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M17 3L17 7" stroke={color} stroke-width="1.2" stroke-linecap="round" />
        <Path d="M7 3L7 7" stroke={color} stroke-width="1.2" stroke-linecap="round" />
        <Path
          d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10V11H3V10Z"
          stroke={color}
          stroke-width="1.2"
        />
        <Rect x="3" y="6" width="18" height="15" rx="2" stroke={color} stroke-width="1.2" />
        <Path
          d="M6 15H10"
          stroke={color}
          stroke-opacity="0.5"
          stroke-width="1.2"
          stroke-linecap="round"
        />
        <Path
          d="M14 15H18"
          stroke={color}
          stroke-opacity="0.5"
          stroke-width="1.2"
          stroke-linecap="round"
        />
        <Path
          d="M6 18H10"
          stroke={color}
          stroke-opacity="0.5"
          stroke-width="1.2"
          stroke-linecap="round"
        />
        <Path
          d="M14 18H18"
          stroke={color}
          stroke-opacity="0.5"
          stroke-width="1.2"
          stroke-linecap="round"
        />
      </Svg>
    </View>
  );
};
