import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';

import moment from 'moment';

import {ImageDefault} from '@components/imageDefault';
import IconAddSVG from '@components/svg/IconAddSVG';
import {IconSmallCalendarSVG} from '@components/svg/IconSmallCalendarSVG';
import {IconSmallTimeSVG} from '@components/svg/IconSmallTimeSVG';
import {ETypeImage} from '@domain/enum/ETypeImage';
import {IOnPressEdit} from '@domain/interfaces/IOnPressEdit';
import {TListItems, TListItemsParticipants} from '@domain/types/TListItems';
import {showModalParticipants} from '@stores/store.modals';
import {useDispatch} from 'react-redux';
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
  const dispath = useDispatch();

  const renderItem = ({item}: {item: TListItems}) => {
    return (
      <St.Base>
        <TouchableOpacity onPress={() => onPressEdit && onPressEdit(item)}>
          <St.BaseRow>
            <St.ColPhoto>
              <ImageDefault name="photoBase64" value={item?.photoBase64} />
            </St.ColPhoto>
            <St.ColTitle>
              <St.Title>{item.category.description}</St.Title>
              <St.Title>{item.title}</St.Title>
              <St.Row>
                <IconSmallCalendarSVG />
                <St.TitleDate>{moment(item.date).format('DD/MM/YY')}</St.TitleDate>
                <IconSmallTimeSVG />
                <St.TitleTimeStart>{item.timeStart}</St.TitleTimeStart>
              </St.Row>
              <St.RowButtom>
                <St.Col>
                  {item.participants.slice(0, 5).map((participant: TListItemsParticipants, key) => (
                    <ImageDefault
                      key={`ImageDefault${key}`}
                      name="photoBase64"
                      value={participant.photoBase64}
                      typeImage={ETypeImage.small}
                    />
                  ))}

                  <St.ImageTitle>
                    {item.participants.length > 5 ? item.participants.length - 5 : ''}
                  </St.ImageTitle>
                </St.Col>
                <St.Col>
                  <TouchableOpacity
                    onPress={() => {
                      dispath(showModalParticipants(item));
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
        keyExtractor={item => item.id.toString()}
        data={items}
        renderItem={renderItem}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      />
    </St.Container>
  );
};

export default EventList;
