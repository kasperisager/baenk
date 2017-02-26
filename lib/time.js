import present from 'present';
import {avg} from './math';

export class Ticker {
  constructor({now = present} = {}) {
    this.now = now;
  }

  start() {
    this.start = this.now();
  }

  elapsed() {
    return this.now() - this.start;
  }
}

/**
 * Get the minimum time resolution.
 *
 * @param {Object} opts
 * @return {Number}
 */
export function resolution({count = 25, now = present} = {}) {
  const samples = new Array(count);

  for (let i = 0, n = samples.length; i < n; i++) {
    const begin = now();

    do {
      samples[i] = now() - begin;
    } while (samples[i] <= 0);
  }

  return avg(samples);
}
