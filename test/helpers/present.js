const SAME_CHANCE = 0.75;

export default function present(precision, {duplicates = false} = {}) {
  let now = 0;

  // Compute the chance of receiving the same timestamp between calls.
  let same = Math.min(SAME_CHANCE, SAME_CHANCE * precision);

  return () => {
    if (!duplicates || (duplicates && Math.random() > same)) {
      now += precision;
    }

    return now;
  };
}
