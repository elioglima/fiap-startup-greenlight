import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';

export interface onBlurTextInput {
  (e: NativeSyntheticEvent<TextInputFocusEventData>): void | undefined;
}
