import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCALE = 325;

/**
 * function that makes the font responsive
 * @param   {Number}
 * @returns {Number}
 */
const scaleFontSize = (fontSize) => {
  const ratio = fontSize / SCALE;
  const newSize = Math.round(ratio * SCREEN_WIDTH);
  return newSize;
};

export default scaleFontSize;
