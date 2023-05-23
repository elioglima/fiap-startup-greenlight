import React from 'react';
import {Text} from 'react-native';
import DatePicker from 'react-native-datepicker';

import {Controller} from 'react-hook-form';
import * as St from './styles';

type TValue = string | undefined | any;

interface propState {
  name: string;
  placeholder?: string;
  value?: TValue;
  control: any;
  formState: any;
  secureTextEntry?: boolean;
}

export const InputCalendarDefault = (props: propState) => {
  const {errors} = props.formState;

  return (
    <St.Container>
      <Controller
        control={props.control}
        name={props.name}
        rules={
          {
            // required: true,
          }
        }
        render={({field: {onChange, value, onBlur}}) => {
          let date = new Date();
          if (value.indexOf('/') === -1) {
            date = new Date(value);
          } else {
            const [day, month, year] = value.toString().split('/');

            const formattedDateString = `${year}-${month}-${day}`;
            date = new Date(formattedDateString);
          }

          return (
            <>
              <DatePicker
                showIcon={false}
                date={date}
                confirmBtnText={'Selecionar'}
                cancelBtnText={'Cancelar'}
                mode="date"
                placeholder="Selecione a data"
                format="DD/MM/YYYY"
                locale="pt"
                onDateChange={onChange}
                style={{
                  width: '100%',
                  borderWidth: 0,
                  borderStyle: 'none',
                  textAlign: 'left',
                }}
              />
            </>
          );
        }}
      />
      {errors[props.name] && <Text>This is required.</Text>}
    </St.Container>
  );
};
