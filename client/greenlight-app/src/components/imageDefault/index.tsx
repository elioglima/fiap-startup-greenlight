import React, {useState} from 'react';

import {SaveFormat, manipulateAsync} from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import {Controller} from 'react-hook-form';
import {Image, TouchableOpacity} from 'react-native';

import * as St from './styles';

type TValue = string | undefined;

interface propState {
  name: string;
  control?: any;
  placeholder?: string;
  value?: TValue;
  formState?: any;
  secureTextEntry?: boolean;
  onUpload?: (image: ImagePicker.ImagePickerAsset) => void;
}

export const ImageDefault = (props: propState) => {
  const [photoUri, setPhotoUri] = useState<string>();
  const [base64Data, setBase64Data] = useState<string | null>();

  const {errors} = props.formState || {errors: undefined};

  const getPermission = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the camera roll is required!');
    }
  };

  return (
    <St.Container>
      {props.control ? (
        <>
          <Controller
            control={props.control}
            rules={
              {
                // required: true,
              }
            }
            render={({field: {onChange, onBlur, value}}) => {
              const selectPhoto = async () => {
                await getPermission();

                let result: ImagePicker.ImagePickerResult =
                  await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                    base64: true, // Set base64 to true to get the image data as base64-encoded string
                  });

                if (!result.canceled && result.assets.length > 0) {
                  const images: ImagePicker.ImagePickerAsset = result.assets[0];
                  const resizedImage = await manipulateAsync(
                    images.uri,
                    [{resize: {width: 500, height: 500}}],
                    {
                      compress: 0.3,
                      format: SaveFormat.JPEG,
                      base64: true,
                    },
                  );

                  console.log(resizedImage);
                  setPhotoUri(resizedImage.uri);
                  setBase64Data(resizedImage.base64);
                  const fileExtension = images.fileName?.toString().split('.')[1];
                  onChange(`data:${images.type}/${fileExtension};base64,${resizedImage.base64}`);
                  if (!props.control) {
                    props.onUpload && props.onUpload(images);
                  }
                }
              };

              return (
                <TouchableOpacity onPress={selectPhoto}>
                  {photoUri ? (
                    <Image
                      source={{uri: value || ''}}
                      style={{width: 95, height: 95, borderRadius: 200}}
                    />
                  ) : (
                    <St.LabelBase>
                      <St.Label>{props.placeholder || 'Selecione'}</St.Label>
                    </St.LabelBase>
                  )}
                </TouchableOpacity>
              );
            }}
            name={props.name}
          />
          {/* {errors[props.name] && <Text>This is required.</Text>} */}
        </>
      ) : (
        <TouchableOpacity onPress={() => {}}>
          {props.value ? (
            <Image source={{uri: props.value}} style={{width: 95, height: 95, borderRadius: 200}} />
          ) : (
            <St.LabelBase>
              <St.Label>{props.placeholder || 'Selecione'}</St.Label>
            </St.LabelBase>
          )}
        </TouchableOpacity>
      )}
    </St.Container>
  );
};
