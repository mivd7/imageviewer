/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
  const [hideControls, setHideControls] = useState(false);
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
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
        onPress={() => {
          setHideControls(!hideControls);
        }}>
        <Icon
          name="chevron-collapse"
          style={{fontSize: hideControls ? 12 : 28, color: 'white'}}
        />
      </TouchableOpacity>

      {!hideControls && (
        <>
          <View style={{flexDirection: 'row', display: 'flex', gap: 20}}>
            <TouchableOpacity
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-end',
                backgroundColor: 'rgba(0,0,0,0.1)',
              }}
              onPress={onLockZoom}>
              <Icon
                name="search"
                style={{
                  fontSize: 28,
                  color: 'white',
                  opacity: zoomLocked ? 0.5 : 1,
                }}
              />
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
              <Icon
                name="expand"
                style={{
                  fontSize: 28,
                  color: 'white',
                  opacity: panLocked ? 0.5 : 1,
                }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}
            onPress={onClose}>
            <Icon name="close" style={{fontSize: 28, color: 'white'}} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ZoomControls;
