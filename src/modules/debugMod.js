/**
 * function for debugging
 * @param {Object} response debugging variable
 * @param {string} text custom text
 */
export function debugFunc(response, text) {
  const debug = true;
  if (debug) {
    console.log(response, text);
  }
}
