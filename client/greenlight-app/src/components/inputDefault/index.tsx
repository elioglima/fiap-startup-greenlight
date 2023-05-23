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
  secureTextEntry?: boolean;
  onKeyPress?: (e: any) => void;
}

export const InputDefault = (props: propState) => {
  const {errors} = props.formState;

  return (
    <St.Container>
      <Controller
        control={props.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <St.Input
            onKeyPress={() => props.onKeyPress && props.onKeyPress(value)}
            secureTextEntry={props.secureTextEntry || false}
            placeholder={props.placeholder || ''}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={props.name}
      />
      {errors[props.name] && <Text>This is required.</Text>}
    </St.Container>
  );
};
