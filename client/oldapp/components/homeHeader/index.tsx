import React from 'react';
import {Image, ImageStyle} from 'react-native';

const sts: ImageStyle = {
  width: '100%',
  height: 250,
};

const HomeHeader: React.FC = () => {
  return <Image style={sts} source={require('./treino.jpeg')} />;
};

export default HomeHeader;
