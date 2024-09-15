import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react';
import {Alert, Linking, Platform, Text} from 'react-native';
import Permissions, {PERMISSIONS} from 'react-native-permissions';

const PermissionWrapper: FC<{children: ReactNode}> = ({children}) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const openSettingsAlert = useCallback(({title}: {title: string}) => {
    Alert.alert(title, '', [
      {
        isPreferred: true,
        style: 'default',
        text: 'Open Settings',
        onPress: () => Linking?.openSettings(),
      },
      {
        isPreferred: false,
        style: 'destructive',
        text: 'Cancel',
        onPress: () => {},
      },
    ]);
  }, []);

  const checkAndroidPermissions = useCallback(async () => {
    if (parseInt(Platform.Version as string, 10) >= 33) {
      const permissions = await Permissions.checkMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      if (
        permissions[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.GRANTED &&
        permissions[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
          Permissions.RESULTS.GRANTED
      ) {
        setHasPermission(true);
        return;
      }
      const res = await Permissions.requestMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.GRANTED &&
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
          Permissions.RESULTS.GRANTED
      ) {
        setHasPermission(true);
      }
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.DENIED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.DENIED
      ) {
        checkAndroidPermissions();
      }
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.BLOCKED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
          Permissions.RESULTS.BLOCKED
      ) {
        openSettingsAlert({
          title: 'Please allow access to your photos and videos from settings',
        });
      }
    } else {
      const permission = await Permissions.check(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      if (permission === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
        return;
      }
      const res = await Permissions.request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      if (res === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
      }
      if (res === Permissions.RESULTS.DENIED) {
        checkAndroidPermissions();
      }
      if (res === Permissions.RESULTS.BLOCKED) {
        openSettingsAlert({
          title: 'Please allow access to the photo library from settings',
        });
      }
    }
  }, [openSettingsAlert]);

  const checkPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const permission = await Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (
        permission === Permissions.RESULTS.GRANTED ||
        permission === Permissions.RESULTS.LIMITED
      ) {
        setHasPermission(true);
        return;
      }
      const res = await Permissions.request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (
        res === Permissions.RESULTS.GRANTED ||
        res === Permissions.RESULTS.LIMITED
      ) {
        setHasPermission(true);
      }
      if (res === Permissions.RESULTS.BLOCKED) {
        openSettingsAlert({
          title: 'Please allow access to the photo library from settings',
        });
      }
    } else if (Platform.OS === 'android') {
      checkAndroidPermissions();
    }
  }, [checkAndroidPermissions, openSettingsAlert]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return (
    <>{hasPermission ? children : <Text>Let me seee your images plox</Text>}</>
  );
};

export default PermissionWrapper;
