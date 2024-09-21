/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback, useRef, useState} from 'react';
import {Image, StatusBar, View, useWindowDimensions} from 'react-native';
import {
  ResumableZoom,
  ResumableZoomType,
  getAspectRatioSize,
  useImageResolution,
} from 'react-native-zoom-toolkit';
import ZoomControls from './ZoomControls';

const INITIAL_MAX_SCALE = 6;
const MAX_SCALE = 20;

const ZoomView: FC<{imageUri: string; onClose: () => void}> = ({
  imageUri,
  onClose,
}) => {
  const {width} = useWindowDimensions();
  const [panLocked, setPanLocked] = useState(false);
  const [zoomLocked, setZoomLocked] = useState(false);
  const [hideControls, setHideControls] = useState(false);
  const [prevScale, setPrevScale] = useState(INITIAL_MAX_SCALE);
  const [currentMaxScale, setCurrentMaxScale] = useState(INITIAL_MAX_SCALE);

  const zoomRef = useRef<ResumableZoomType>(null);

  const {isFetching, resolution} = useImageResolution({uri: imageUri});

  const updateMaxScale = useCallback(() => {
    const zoomState = zoomRef.current?.requestState();
    if (!zoomState) {
      return;
    }
    const currentScale = zoomState.scale;
    if (currentScale < prevScale) {
      // scale is decreasing
      setCurrentMaxScale(
        currentScale - 2 < INITIAL_MAX_SCALE
          ? INITIAL_MAX_SCALE
          : currentMaxScale - 2,
      );
    }

    if (currentScale > prevScale) {
      // scale is increasing
      setCurrentMaxScale(
        currentMaxScale + 2 > MAX_SCALE ? MAX_SCALE : currentMaxScale + 2,
      );
    }

    if (zoomState?.scale !== prevScale) {
      setPrevScale(zoomState?.scale);
    }
  }, [currentMaxScale, prevScale, zoomRef]);
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
        ref={zoomRef}
        maxScale={currentMaxScale}
        onTap={() => {
          setHideControls(!hideControls);
          updateMaxScale();
        }}
        onPinchStart={updateMaxScale}
        tapsEnabled={!zoomLocked}
        panEnabled={!panLocked}
        pinchEnabled={!zoomLocked}>
        <Image source={{uri: imageUri}} style={imageSize} />
      </ResumableZoom>
    </View>
  );
};

export default ZoomView;
