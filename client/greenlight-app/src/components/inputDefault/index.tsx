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
  isLowerCase?: boolean;
  onKeyPress?: (e: any) => void;
}

export const InputDefault = (props: propState) => {
  const {errors} = props.formState;
  console.log(props.isLowerCase);

  return (
    <St.Container>
      <Controller
        control={props.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <St.Input
              onKeyPress={() =>
                props.onKeyPress &&
                props.onKeyPress(
                  props.isLowerCase === true ? value.toString().toLowerCase() : value,
                )
              }
              secureTextEntry={props.secureTextEntry || false}
              placeholder={props.placeholder || ''}
              onBlur={onBlur}
              onChangeText={onChange}
              value={props.isLowerCase === true ? value.toString().toLowerCase() : value}
              autoCapitalize="none"
            />
          );
        }}
        name={props.name}
      />
      {errors[props.name] && <Text>This is required.</Text>}
    </St.Container>
  );
};
