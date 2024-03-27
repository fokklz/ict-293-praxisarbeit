/**
 * This file is meant to contain functions which
 * enhance the work with javascript.
 */
/**
 * Registers an event listener on the given selector. (single element)
 *
 * @param {*} selector The selector of the element to register the listener on.
 * @param {*} event The event to listen for.
 * @param {*} fn The function to call when the event is triggered.
 */
export function registerListener(selector, event, fn) {
  document.querySelector(selector).addEventListener(event, fn);
}
