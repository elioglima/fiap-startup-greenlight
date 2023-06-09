import React from 'react';
import {Controller} from 'react-hook-form';
import {Text} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import {TMenuItem} from '@domain/types/TMenuItem';
import * as St from './styles';

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
          <RNPickerSelect
            placeholder={{label: 'Selecione', value: null}}
            value={value}
            onValueChange={onChange}
            items={
              (props.data && props.data.map((c: TMenuItem) => ({label: c.title, value: c.id}))) ||
              []
            }
          />
        )}
      />

      {errors[props.name] && <Text>This is required.</Text>}
    </St.Container>
  );
};
