import { increases, passwords, hasDoubles, dvojicky } from './passwords';

test('part one', () => {
  expect(increases('111112')).toBe(true);
  expect(increases('111312')).toBe(false);

  expect(hasDoubles('111312')).toBe(true);
  expect(hasDoubles('111111')).toBe(true);
  expect(hasDoubles('223450')).toBe(true);
  expect(hasDoubles('123789')).toBe(false);


  expect(passwords(265275, 781584, [increases, hasDoubles]).length).toBe(960)
});


test('part two', () => {
  expect(dvojicky('111122')).toBe(true);
  expect(dvojicky('111123')).toBe(false);
  expect(dvojicky('123455')).toBe(true);
  expect(dvojicky('123555')).toBe(false);
  expect(dvojicky('222233')).toBe(true);
  expect(dvojicky('122555')).toBe(true);
  expect(dvojicky('111122')).toBe(true);
  expect(dvojicky('122555')).toBe(true);
  expect(dvojicky('111122')).toBe(true);
  expect(dvojicky('111222')).toBe(false);

  expect(passwords(265275, 781584, [increases, hasDoubles, dvojicky]).length).toBe(626)
});
