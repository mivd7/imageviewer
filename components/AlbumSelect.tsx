/* eslint-disable react-native/no-inline-styles */
import {Album} from '@react-native-camera-roll/camera-roll';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  albums: Album[];
  selectedAlbum: Partial<Album> | undefined;
  onSelect: (selectedItem: Album, index: number) => void;
}

const AlbumSelect: FC<Props> = ({albums, selectedAlbum, onSelect}) => {
  console.log('selectedAlbum', selectedAlbum);
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <SelectDropdown
        data={[{title: 'All'}, ...albums]}
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
    borderRadius: 12,
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
    fontSize: 12,
  },
  dropdownButtonIconStyle: {
    fontSize: 12,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
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
