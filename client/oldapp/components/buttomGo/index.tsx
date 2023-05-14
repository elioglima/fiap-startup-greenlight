import React from 'react';
import {TouchableOpacity} from 'react-native';
import * as St from './styles';

interface iProps {
  title: string;
  onPress?: any;
  textCenter?: boolean;
  textTransform?: string;
}

export const ButtomGo = (props: iProps) => {
  const {title, onPress} = props;
  return (
    <St.Base>
      <TouchableOpacity onPressOut={onPress}>
        <St.Container {...props}>
          <St.Title {...{textTransform: props.textTransform}}>{title}</St.Title>
        </St.Container>
      </TouchableOpacity>
    </St.Base>
  );
};
