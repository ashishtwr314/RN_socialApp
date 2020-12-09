import {PermissionsAndroid} from 'react-native';
// import {PermissionStatus} from 'react-native-permissions';

export const requestPermissions = async () => {
  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ]);

  if (
    granted['PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE'] ==
      'denied' ||
    granted['PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE'] == 'denied'
  ) {
    requestPermissions();
  }
};
