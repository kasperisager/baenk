import test from 'ava';
import {Ticker, resolution} from '../lib/time';
import present from './helpers/present';

test('Ticker() returns the elapsed time since a ticker was started', async t => {
  for (const precision of [1, 1e-3, 1e-6]) {
    const now = present(precision);

    const ticker = new Ticker({now});

    ticker.start();

    for (let i = 1; i <= 10; i++) {
      t.true(Math.abs(ticker.elapsed() - (i * precision)) < Number.EPSILON);
    }
  }
});

test('resolution() returns the minimum time resolution', async t => {
  for (const precision of [1, 1e-3, 1e-6]) {
    // Create a timer that has a chance of duplicate timestamps.
    const now = present(precision, {duplicates: true});

    // Check that the reported resolution matches the precision.
    t.true(Math.abs(resolution({now}) - precision) < Number.EPSILON);
  }
});
