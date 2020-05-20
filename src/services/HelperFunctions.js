import {Platform} from 'react-native';

/**
 *
 * @param {props width<Integer>}
 */
export const getForCartDialog = (width) => {
  if (Platform.OS == 'web' && width > 800) return true;
  return false;
};
