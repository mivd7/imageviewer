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
  const [prevScale, setPrevScale] = useState(0);
  const [currentMaxScale, setCurrentMaxScale] = useState(INITIAL_MAX_SCALE);

  const zoomRef = useRef<ResumableZoomType>(null);

  const updateMaxScale = useCallback(() => {
    const zoomState = zoomRef.current?.requestState();
    if (!zoomState) {
      return;
    }
    const currentScale = zoomState.scale;
    if (currentScale !== prevScale) {
      // scale has changed
      setPrevScale(zoomState?.scale);
    }

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
        currentScale + 2 > MAX_SCALE ? MAX_SCALE : currentMaxScale + 2,
      );
    }
  }, [currentMaxScale, prevScale, zoomRef]);

  const {isFetching, resolution} = useImageResolution({uri: imageUri});
  if (isFetching || resolution === undefined) {
    return null;
  }

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
        }}
        onGestureEnd={updateMaxScale}
        tapsEnabled={!zoomLocked}
        panEnabled={!panLocked}
        pinchEnabled={!zoomLocked}>
        <Image
          source={{uri: imageUri}}
          style={[imageSize, {objectFit: 'contain'}]}
        />
      </ResumableZoom>
    </View>
  );
};

export default ZoomView;
