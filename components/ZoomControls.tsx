/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

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
  const zoomLockText = zoomLocked ? 'Unlock' : 'Lock';
  const panLockText = panLocked ? 'Unlock' : 'Lock';
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        zIndex: 10,
      }}>
      <TouchableOpacity
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
        onPress={onLockZoom}>
        <Text style={{fontSize: 12, color: 'white'}}>{zoomLockText} zoom</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
        onPress={onLockPan}>
        <Text style={{fontSize: 12, color: 'white'}}>{panLockText} pan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
        onPress={onClose}>
        <Text style={{fontSize: 12, color: 'white'}}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ZoomControls;
