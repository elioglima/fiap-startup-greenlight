import React from 'react';
import {View} from 'react-native';
import {Path, Rect, Svg} from 'react-native-svg';

export const IconCalendarSVG = () => {
  return (
    <View>
      <Svg width="45" height="45" viewBox="0 0 45 45" fill="none">
        <Path
          d="M31.875 5.625L31.875 13.125"
          stroke="white"
          stroke-width="3"
          stroke-linecap="round"
        />
        <Path
          d="M13.125 5.625L13.125 13.125"
          stroke="white"
          stroke-width="3"
          stroke-linecap="round"
        />
        <Path
          d="M5.625 15.25C5.625 13.3644 5.625 12.4216 6.21079 11.8358C6.79657 11.25 7.73938 11.25 9.625 11.25H35.375C37.2606 11.25 38.2034 11.25 38.7892 11.8358C39.375 12.4216 39.375 13.3644 39.375 15.25V20.625H5.625V15.25Z"
          stroke="white"
          stroke-width="3"
        />
        <Rect
          x="5.625"
          y="11.25"
          width="33.75"
          height="28.125"
          rx="2"
          stroke="white"
          stroke-width="3"
        />
        <Path
          opacity="0.8"
          d="M11.25 28.125H18.75"
          stroke="#FBFBFB"
          stroke-width="3"
          stroke-linecap="round"
        />
        <Path
          opacity="0.8"
          d="M26.25 28.125H33.75"
          stroke="#FBFBFB"
          stroke-width="3"
          stroke-linecap="round"
        />
        <Path
          opacity="0.8"
          d="M11.25 33.75H18.75"
          stroke="#FBFBFB"
          stroke-width="3"
          stroke-linecap="round"
        />
        <Path
          opacity="0.8"
          d="M26.25 33.75H33.75"
          stroke="#FBFBFB"
          stroke-width="3"
          stroke-linecap="round"
        />
      </Svg>
    </View>
  );
};
