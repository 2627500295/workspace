import { times } from './calculator';

/**
 * 倍数
 *
 * @param {number} x 倍数
 */
function multiple(x: number) {
  return (y: number) => times(x, y);
}


export default multiple;
