/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback, useRef, useState} from 'react';
import {
  StatusBar,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  ResumableZoom,
  ResumableZoomType,
  SwipeDirection,
  getAspectRatioSize,
  useImageResolution,
} from 'react-native-zoom-toolkit';
import ZoomControls from './ZoomControls';
import Animated, {
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  getCurrentScaleStepIndex,
  INITIAL_MAX_SCALE,
  scaleSteps,
} from '../constants';

interface Props {
  imageUri: string;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ZoomView: FC<Props> = ({imageUri, onClose, onNext, onPrevious}) => {
  const {width} = useWindowDimensions();
  const [panLocked, setPanLocked] = useState(false);
  const [zoomLocked, setZoomLocked] = useState(false);
  const [hideControls, setHideControls] = useState(false);
  const [prevScale, setPrevScale] = useState(0);
  const [currentMaxScale, setCurrentMaxScale] = useState(INITIAL_MAX_SCALE);

  const handleSwipe = useCallback(
    (dir: SwipeDirection) => {
      const controlsLocked = panLocked || zoomLocked;
      if (!controlsLocked) {
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
    [panLocked, zoomLocked, onNext, onPrevious],
  );
  const zoomRef = useRef<ResumableZoomType>(null);
  const updateMaxScale = useCallback(() => {
    setHideControls(true);
    const zoomState = zoomRef.current?.requestState();
    if (!zoomState) {
      return;
    }
    const currentScale = zoomState.scale;
    const scaleStepIndex = getCurrentScaleStepIndex(currentScale);

    if (currentScale !== prevScale) {
      setPrevScale(currentScale);
    }

    if (currentScale < prevScale) {
      setCurrentMaxScale(scaleSteps[scaleStepIndex - 1] ?? scaleSteps[0]);
    }

    if (currentScale > prevScale) {
      setCurrentMaxScale(
        scaleSteps[scaleStepIndex + 1] ?? scaleSteps[scaleSteps.length - 1],
      );
    }
  }, [prevScale]);

  const scale = zoomRef?.current?.requestState().scale;

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale ?? 1 * 1.25,
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
        onGestureEnd={updateMaxScale}
        tapsEnabled={!zoomLocked}
        panEnabled={!panLocked}
        pinchEnabled={!zoomLocked}>
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => {
            setHideControls(!hideControls);
          }}
          onLongPress={() => setHideControls(false)}>
          <Animated.Image
            entering={SlideInRight.duration(250)}
            exiting={SlideInLeft.duration(250)}
            source={{uri: imageUri}}
            style={[imageSize, customSpringStyles]}
          />
        </TouchableOpacity>
      </ResumableZoom>
    </View>
  );
};

export default ZoomView;
