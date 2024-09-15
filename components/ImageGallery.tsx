/* eslint-disable react-native/no-inline-styles */
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import FlexLayout, {baseStyles} from './FlexLayout';

const ImageGallery: FC = () => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [zoomedInPhoto, setZoomedInPhoto] = useState<PhotoIdentifier>();
  const windowDimensions = useWindowDimensions();
  const fetchPhotos = useCallback(async () => {
    const res = await CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
    });
    setPhotos(res?.edges);
  }, []);

  useEffect(() => {
    if (!photos.length) {
      fetchPhotos();
    }
  }, [photos, fetchPhotos]);

  return !zoomedInPhoto ? (
    <ScrollView>
      <FlexLayout
        styles={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
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
    <TouchableOpacity onPress={() => setZoomedInPhoto(undefined)}>
      <Image
        source={{uri: zoomedInPhoto.node.image.uri}}
        style={{height: windowDimensions.height, width: windowDimensions.width}}
      />
    </TouchableOpacity>
  );
};

export default ImageGallery;
