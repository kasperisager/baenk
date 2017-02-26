/**
 * Get the body of a function as a string.
 *
 * @param {Function} fn
 * @return {String}
 */
export default function source(fn) {
  if (!fn) {
    throw new Error('Expected a function');
  }

  const str = String(fn);

  const fst = str.indexOf('{');
  const lst = str.lastIndexOf('}');

  return str.slice(fst + 1, lst).trim();
}
