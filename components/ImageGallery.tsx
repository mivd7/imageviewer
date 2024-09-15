/* eslint-disable react-native/no-inline-styles */
import {
  Album,
  GetPhotosParams,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import React, {FC, useState} from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import FlexLayout, {baseStyles} from './layout/FlexLayout';
import ZoomView from './ZoomView';
import AlbumSelect from './AlbumSelect';
import useImageFetcher from '../hooks/useImageFetcher';

const ImageGallery: FC = () => {
  const {photos, albums, fetchPhotos} = useImageFetcher();
  const [zoomedInPhoto, setZoomedInPhoto] = useState<PhotoIdentifier>();
  const [selectedAlbum, setSelectedAlbum] = useState<Album>();
  const {height} = useWindowDimensions();

  const onSelect = ({title, type, id}: Album) => {
    const params: GetPhotosParams = {
      first: 24,
      groupName: title,
      groupTypes: type,
    };
    fetchPhotos(params).then(() =>
      setSelectedAlbum(albums.find(album => album.id === id)),
    );
  };

  return !zoomedInPhoto ? (
    <ScrollView
      contentContainerStyle={{height, width: '100%'}}
      style={{backgroundColor: 'aliceblue'}}>
      <AlbumSelect
        albums={albums}
        onSelect={onSelect}
        selectedAlbum={selectedAlbum}
      />
      <FlexLayout
        styles={{
          paddingLeft: 16,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 8,
        }}>
        {photos.map(photo => {
          return (
            <TouchableOpacity
              key={photo.node.id}
              onPress={() => setZoomedInPhoto(photo)}>
              <Image
                style={baseStyles.box}
                source={{uri: photo.node.image.uri}}
              />
            </TouchableOpacity>
          );
        })}
      </FlexLayout>
    </ScrollView>
  ) : (
    <ZoomView
      imageUri={zoomedInPhoto.node.image.uri}
      onClose={() => setZoomedInPhoto(undefined)}
    />
  );
};

export default ImageGallery;
