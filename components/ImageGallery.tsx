import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Image, ScrollView} from 'react-native';
import FlexLayout, {baseStyles} from './FlexLayout';

const ImageGallery: FC = () => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
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

  return (
    <ScrollView>
      <FlexLayout
        styles={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
        {photos.map((p, i) => {
          return (
            <Image
              key={i}
              style={baseStyles.box}
              source={{uri: p.node.image.uri}}
            />
          );
        })}
        {photos.map((p, i) => {
          return (
            <Image
              key={i}
              style={baseStyles.box}
              source={{uri: p.node.image.uri}}
            />
          );
        })}
      </FlexLayout>
    </ScrollView>
  );
};

export default ImageGallery;
