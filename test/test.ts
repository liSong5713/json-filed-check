import jsonFieldCheck from '../src';
const faker = {
  normalProperty: 'normal value',
  funcProp: function (params) {
    return 'function value';
  },
  date: new Date(),
  map: new Map(),
  bigint: BigInt(1234),
  promise: Promise.resolve('promise value'),
  list: [{ listPromise: Promise.resolve('noting'), p1: { p2: { p3: function test() {} } } }],
  list2: [{ p1: BigInt(1234), p2: { p3: Symbol(1234), p4: new Set([1, 2, 3]) } }],
};

faker.list2.push(faker as never);

console.log(jsonFieldCheck(faker));
