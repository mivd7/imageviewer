/* eslint-disable react-native/no-inline-styles */
import {Album} from '@react-native-camera-roll/camera-roll';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  albums: Album[];
  selectedAlbum: Partial<Album>;
  onSelect: (selectedItem: Album, index: number) => void;
}

export const defaultAlbum: Partial<Album> = {title: 'All'};

const AlbumSelect: FC<Props> = ({albums, selectedAlbum, onSelect}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <SelectDropdown
        data={[defaultAlbum, ...albums]}
        defaultValue={selectedAlbum}
        onSelect={onSelect}
        renderButton={(selectedItem: Album, isOpen) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {selectedItem?.title ?? 'Select album'}
              </Text>
              <Icon
                name={isOpen ? 'chevron-up' : 'chevron-down'}
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item: Album, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && {backgroundColor: '#D2D9DF'}),
              }}>
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

export default AlbumSelect;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    display: 'flex',
    width: '100%',
    height: 32,
    backgroundColor: '#E9ECEF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 20,
  },
  dropdownButtonIconStyle: {
    fontSize: 12,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 16,
    marginRight: 8,
  },
});
