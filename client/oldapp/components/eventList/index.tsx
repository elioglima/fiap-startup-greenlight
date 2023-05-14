import moment from 'moment';
import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';

import {IconAddSVG, IconSmallCalendarSVG, IconSmallTimeSVG} from 'components';
import {IOnPressEdit} from 'domain/interfaces/IOnPressEdit';
import {TListItems} from 'domain/types/TListItems';
import * as St from './styles';

interface functionBoolean {
  (active: boolean): void;
}
interface PropStateEventList {
  items: TListItems[];
  onPressEdit: IOnPressEdit;
  onPressItem?: (item: TListItems) => void;
  setOpenAddItem: functionBoolean;
}

export const EventList: React.FC<PropStateEventList> = ({items, onPressEdit, setOpenAddItem}) => {
  const renderItem = ({item}: {item: TListItems}) => {
    return (
      <St.Base>
        <TouchableOpacity onPress={() => onPressEdit && onPressEdit(item)}>
          <St.BaseRow>
            <St.ColPhoto>
              <St.Logo />
            </St.ColPhoto>
            <St.ColTitle>
              <St.Title>{item.title}</St.Title>
              <St.Row>
                <IconSmallCalendarSVG />
                <St.TitleDate>{moment(item.date).format('DD/MM/YY')}</St.TitleDate>
                <IconSmallTimeSVG />
                <St.TitleTimeStart>{item.timeStart}</St.TitleTimeStart>
              </St.Row>
              <St.RowButtom>
                <St.Col>
                  <St.Image source={require('../../assets/png/photo1.png')} />
                  <St.Image source={require('../../assets/png/photo2.png')} />
                  <St.Image source={require('../../assets/png/photo3.png')} />
                  <St.Image source={require('../../assets/png/photo4.png')} />
                  <St.ImageTitle>+5</St.ImageTitle>
                </St.Col>
                <St.Col>
                  <TouchableOpacity
                    onPress={() => {
                      setOpenAddItem(true);
                    }}>
                    <IconAddSVG />
                  </TouchableOpacity>
                </St.Col>
              </St.RowButtom>
            </St.ColTitle>
          </St.BaseRow>
        </TouchableOpacity>
      </St.Base>
    );
  };

  return (
    <St.Container>
      <FlatList
        data={items}
        renderItem={renderItem}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
      />
    </St.Container>
  );
};

export default EventList;
