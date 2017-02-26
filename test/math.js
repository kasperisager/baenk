import test from 'ava';
import {sum, avg} from '../lib/math';

test('sum() returns the sum of an array of numbers', async t => {
  const arr = [1, 2, 3, 4];
  t.is(sum(arr), 10);
});

test('avg() returns the average of an array of numbers', async t => {
  const arr = [1, 2, 3, 4];
  t.is(avg(arr), 2.5);
});
