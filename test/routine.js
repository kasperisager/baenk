import test from 'ava';
import {spy} from 'sinon';
import Routine, {compile} from '../lib/routine';

test('Routine() can be constructed from a test', async t => {
  const test = () => 1 + 2;
  const routine = new Routine(test);

  t.is(routine.test, test);
});

test('Routine() can be constructed with before and after hooks', async t => {
  const test = () => 1 + 2;
  const before = () => 3 + 4;
  const after = () => 5 + 6;

  const routine = new Routine(test, {before, after});

  t.is(routine.before, before);
  t.is(routine.after, after);
});

test('Routine#compile() constructs an executable function given a routine', async t => {
  const test = spy();
  const before = spy();
  const after = spy();

  const routine = new Routine(function () {
    this.test();
  }, {
    before() {
      this.before();
    },
    after() {
      this.after();
    }
  });

  // Compile the routine with the `test`, `before`, and `after` spies.
  const fn = routine.compile({test, before, after});

  // Execute the compiled routine with 5 iterations.
  const {elapsed} = fn(5);

  t.is(typeof elapsed, 'number');

  // Order of execution: `before` -> `test` -> `after`
  t.true(before.calledBefore(test));
  t.true(after.calledAfter(test));

  // `before` and `after` should only happen once.
  t.true(before.calledOnce);
  t.true(after.calledOnce);

  // `test` should happen five times.
  t.is(test.callCount, 5);
});
