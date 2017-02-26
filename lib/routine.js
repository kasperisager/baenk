import source from './source';
import {Ticker} from './time';

const noop = function () {};

export default class Routine {
  constructor(test, {before = noop, after = noop} = {}) {
    this.test = test;
    this.before = before;
    this.after = after;
  }

  /**
   * Compile this routine to an executable function.
   *
   * @param {Object} context The value of `this` in the routine functions.
   * @return {Function} The compiled function.
   */
  compile(context = {}) {
    const {test, before, after} = this;

    const uid = `uid${Date.now()}`;

    const body = `
      ${source(before)}

      var ${uid}s = new ${uid}env.Ticker();

      ${uid}s.start();

      while (${uid}iter--) {
        ${source(test)}
      }

      var ${uid}e = ${uid}s.elapsed();

      ${source(after)}

      return {elapsed: ${uid}e};
    `;

    const compiled = new Function(`${uid}env`, `${uid}iter`, body.trim());

    return iter => compiled.call(context, {Ticker}, iter);
  }
}
