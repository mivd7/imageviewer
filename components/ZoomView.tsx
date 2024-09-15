/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, createRef} from 'react';
import {Animated, StatusBar} from 'react-native';
import {
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  PanGestureHandler,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';
import ZoomControls from './ZoomControls';

const ZoomView: React.FC<{imageUri: string; onClose: () => void}> = ({
  imageUri,
  onClose,
}) => {
  const [panEnabled, setPanEnabled] = useState(false);
  const [locked, setLocked] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const pinchRef = createRef();
  const panRef = createRef();

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: {scale},
      },
    ],
    {useNativeDriver: true},
  );

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const handlePinchStateChange = ({
    nativeEvent,
  }: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>) => {
    // enabled pan only after pinch-zoom
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        setPanEnabled(false);
      }
    }
  };

  return (
    <GestureHandlerRootView
      style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
      <StatusBar hidden />

      <PanGestureHandler
        onGestureEvent={onPanEvent}
        ref={panRef}
        simultaneousHandlers={[pinchRef]}
        enabled={panEnabled}
        failOffsetX={[-1000, 1000]}
        shouldCancelWhenOutside>
        <Animated.View style={{position: 'relative'}}>
          <ZoomControls
            onClose={onClose}
            onLockPan={() => {
              setPanEnabled(!panEnabled);
            }}
            onLockZoom={() => {
              setLocked(!locked);
            }}
            panEnabled={panEnabled}
            zoomEnabled={!locked}
          />
          <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={onPinchEvent}
            simultaneousHandlers={[panRef]}
            onHandlerStateChange={handlePinchStateChange}
            enabled={!locked}>
            <Animated.Image
              source={{
                uri: imageUri,
              }}
              style={{
                width: '100%',
                height: '100%',
                transform: [{scale}, {translateX}, {translateY}],
              }}
              resizeMode="contain"
            />
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ZoomView;
