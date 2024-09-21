/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback, useRef, useState} from 'react';
import {StatusBar, View, useWindowDimensions} from 'react-native';
import {
  ResumableZoom,
  ResumableZoomType,
  SwipeDirection,
  getAspectRatioSize,
  useImageResolution,
} from 'react-native-zoom-toolkit';
import ZoomControls from './ZoomControls';
import Animated, {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  imageUri: string;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const INITIAL_MAX_SCALE = 6;
const MAX_SCALE = 20;

const ZoomView: FC<Props> = ({imageUri, onClose, onNext, onPrevious}) => {
  const {width} = useWindowDimensions();
  const [panLocked, setPanLocked] = useState(false);
  const [zoomLocked, setZoomLocked] = useState(false);
  const [hideControls, setHideControls] = useState(false);
  const [prevScale, setPrevScale] = useState(0);
  const [currentMaxScale, setCurrentMaxScale] = useState(INITIAL_MAX_SCALE);
  const offset = useSharedValue(0);

  const handleSwipe = useCallback(
    (dir: SwipeDirection) => {
      const controlsLocked = panLocked || zoomLocked;
      if (!controlsLocked) {
        offset.value = withSpring(offset.value * 255, {
          damping: 20,
          stiffness: 90,
        });
        switch (dir) {
          case 'left':
            onNext();
            break;
          case 'right':
            onPrevious();
            break;
          default:
            break;
        }
      }
    },
    [panLocked, zoomLocked, offset, onNext, onPrevious],
  );
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

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 255, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

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
        onSwipe={handleSwipe}
        maxScale={currentMaxScale}
        onTap={() => {
          setHideControls(!hideControls);
        }}
        onGestureEnd={updateMaxScale}
        tapsEnabled={!zoomLocked}
        panEnabled={!panLocked}
        pinchEnabled={!zoomLocked}>
        <Animated.Image
          entering={FadeIn}
          source={{uri: imageUri}}
          style={[imageSize, customSpringStyles]}
        />
      </ResumableZoom>
    </View>
  );
};

export default ZoomView;
