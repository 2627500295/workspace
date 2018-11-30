/**
 * 组合函数
 *
 * @param fns 函数数组
 * @returns {function(*=): *}
 */
function compose(...fns: Function[]): (any) => any {
  function composed(result: any) {
    var list: Function[] = fns.slice();

    while (list.length > 0) {
      result = list.pop()(result);
    }

    return result;
  };

  return composed;
}

export default compose;
