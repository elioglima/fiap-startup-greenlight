import {TStoreConfigsRegion} from '@domain/types/states/TStatesConfigs';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as St from './styles';

export type TRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

interface IPropState {
  region?: TStoreConfigsRegion;
  enabled?: boolean;
}
const MapScreen = ({enabled = false, ...props}: IPropState) => {
  const [zoom, setZoom] = useState<number>(0.0019);

  const [region, setRegion] = useState<TRegion>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: zoom,
    longitudeDelta: zoom,
  });

  useEffect(() => {
    console.log(1234, props.region);
    if (!props.region?.latitude || !props.region?.longitude) {
      return;
    }

    setRegion({
      latitude: props.region?.latitude,
      longitude: props.region?.longitude,
      latitudeDelta: zoom,
      longitudeDelta: zoom,
    });
  }, [props.region]);

  const checkPin = (region?.latitude && region?.longitude) || false;

  return (
    <St.Container pointerEvents={enabled ? 'auto' : 'none'}>
      <MapView style={styles.map} region={region}>
        {checkPin && (
          <Marker
            coordinate={{latitude: region?.latitude, longitude: region?.longitude}}
            title="Marker Title"
            description="Marker Description"
          />
        )}
      </MapView>
    </St.Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
