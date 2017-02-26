import test from 'ava';
import source from '../lib/source';

test('source() gets the body of a function as a string', async t => {
  function fn() {
    return 1 + 2;
  }

  t.is(source(fn), 'return 1 + 2;');
});
