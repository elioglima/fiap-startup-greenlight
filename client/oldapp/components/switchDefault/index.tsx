import React from 'react';
import {Controller} from 'react-hook-form';
import {Text} from 'react-native';

import * as St from './styles';

type TValue = string | undefined;

interface propState {
  name: string;
  placeholder?: string;
  value?: TValue;
  control: any;
  formState: any;
}

export const SwitchDefault = (props: propState) => {
  const {errors} = props.formState;

  return (
    <St.Container>
      <Controller
        control={props.control}
        rules={
          {
            // required: true,
          }
        }
        render={({field: {onChange, value}}) => (
          <St.Switch value={value} onValueChange={onChange} />
        )}
        name={props.name}
      />
      <St.SwitchText>{props.placeholder || ''}</St.SwitchText>
      {errors[props.name] && <Text>This is required.</Text>}
    </St.Container>
  );
};
