/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  onClose: () => void;
  onLockZoom: () => void;
  onLockPan: () => void;
  panLocked: boolean;
  zoomLocked: boolean;
}
const ZoomControls: React.FC<Props> = ({
  onClose,
  onLockPan,
  onLockZoom,
  panLocked,
  zoomLocked,
}) => {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        position: 'absolute',
        top: -16,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
      }}>
      <TouchableOpacity style={styles.controlButton} onPress={onLockPan}>
        <Icon
          name="expand"
          style={{
            fontSize: 24,
            color: 'white',
            opacity: panLocked ? 0.5 : 1,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={onLockZoom}>
        <Icon
          name="zoom-in"
          style={{
            fontSize: 24,
            color: 'white',
            opacity: zoomLocked ? 0.5 : 1,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={onClose}>
        <Icon name="close" style={styles.closeIcon} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ZoomControls;

const styles = StyleSheet.create({
  controlButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 12,
  },
  closeIcon: {
    fontSize: 24,
    color: 'white',
  },
});
