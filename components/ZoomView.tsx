/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {Image, StatusBar, View, useWindowDimensions} from 'react-native';
import {
  ResumableZoom,
  getAspectRatioSize,
  useImageResolution,
} from 'react-native-zoom-toolkit';
import ZoomControls from './ZoomControls';

const ZoomView: FC<{imageUri: string; onClose: () => void}> = ({
  imageUri,
  onClose,
}) => {
  const {width} = useWindowDimensions();
  const [panLocked, setPanLocked] = useState(false);
  const [zoomLocked, setZoomLocked] = useState(false);
  const [hideControls, setHideControls] = useState(false);
  // Gets the resolution of your image
  const {isFetching, resolution} = useImageResolution({uri: imageUri});
  if (isFetching || resolution === undefined) {
    return null;
  }

  // An utility function to get the size without compromising the aspect ratio
  const imageSize = getAspectRatioSize({
    aspectRatio: resolution.width / resolution.height,
    width: width,
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <StatusBar hidden />
      {!hideControls && (
        <ZoomControls
          onClose={onClose}
          onLockPan={() => {
            setPanLocked(!panLocked);
          }}
          onLockZoom={() => {
            setZoomLocked(!zoomLocked);
          }}
          panLocked={panLocked}
          zoomLocked={zoomLocked}
        />
      )}
      <ResumableZoom
        maxScale={20}
        onTap={() => setHideControls(!hideControls)}
        panEnabled={!panLocked}
        pinchEnabled={!zoomLocked}>
        <Image source={{uri: imageUri}} style={imageSize} />
      </ResumableZoom>
    </View>
  );
};

export default ZoomView;
