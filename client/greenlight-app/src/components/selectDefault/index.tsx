import React from 'react';
import {Controller} from 'react-hook-form';
import {Text} from 'react-native';

import * as St from './styles';
import {Picker} from '@react-native-picker/picker';
import {TMenuItem} from '@domain/types/TMenuItem';

type TValue = string | undefined;

interface propState {
  name: string;
  placeholder?: string;
  value?: TValue;
  control: any;
  formState: any;
  secureTextEntry?: boolean;
  data?: TMenuItem[];
}

export const SelectDefault = (props: propState) => {
  const {errors} = props.formState;

  return (
    <St.Container>
      <Controller
        control={props.control}
        name={props.name}
        rules={{required: true}}
        render={({field: {onChange, value}}) => (
          <Picker selectedValue={value} onValueChange={onChange}>
            {props.data &&
              props.data.map((c: TMenuItem) => (
                <Picker.Item key={c.id} label={c.title} value={c.id} />
              ))}
          </Picker>
        )}
      />

      {errors[props.name] && <Text>This is required.</Text>}
    </St.Container>
  );
};
