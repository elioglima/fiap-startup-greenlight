import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';

import * as St from './styles';
import {TMenuItem} from 'domain/types/TMenuItem';

interface Props {
  items: TMenuItem[];
  onPressItem: (item: TMenuItem) => void;
}

export const HorizontalMenu: React.FC<Props> = ({items, onPressItem}) => {
  const renderItem = ({item}: {item: TMenuItem}) => {
    return (
      <TouchableOpacity onPress={() => onPressItem(item)}>
        <St.HorizontalMenuItemBase>
          <St.HorizontalMenuItemTitle>{item.title}</St.HorizontalMenuItemTitle>
          <St.HorizontalMenuItemLogo />
        </St.HorizontalMenuItemBase>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={items}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default HorizontalMenu;
