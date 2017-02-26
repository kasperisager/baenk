import Routine from './routine';
import {resolution} from './time';

export default class Bench {
  constructor(title) {
    this.title = title;
    this.tests = [];
    this.options = {};
  }

  test(title, fn) {
    this.tests.push([title, fn]);
  }

  before(fn) {
    this.options.before = fn;
  }

  after(fn) {
    this.options.after = fn;
  }

  run() {
    const minimum = Math.max(resolution() / 2 / 0.01, 0.05) * 1e3;
    const maximum = 5000;
    const results = [];

    for (let i = 0, n = this.tests.length; i < n; i++) {
      const [title, fn] = this.tests[i];

      const routine = new Routine(fn, this.options);
      const compiled = routine.compile();

      let count = 1;
      let period = compiled(count).elapsed;

      let elapsed = 0;

      while (elapsed < minimum) {
        let c = Math.ceil((minimum - elapsed) / period);
        let e = compiled(c).elapsed;

        period = e / c;
        count += c;
        elapsed += e;
      }

      const samples = [];

      while (elapsed < maximum) {
        let e = compiled(count).elapsed;

        period = e / count;
        elapsed += e;

        samples.push((1 / period) * 1e3);
      }

      results.push({title, samples});
    }

    return results;
  }
}
