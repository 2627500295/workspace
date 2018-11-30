
/**
 * 创建元素
 *
 * @param tag Tag
 */
export function createElement(
  tag: string = 'div'
) {
  const el = document.createElement(tag);
  return el;
}

/**
 * 设置属性
 *
 * @param el HTMLElement
 */
export function attr(
  el: HTMLElement,
  name: string,
  value: any = true
) {
  if (el && name) el.setAttribute(name, value);
  return el;
}
