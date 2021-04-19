import { addByIndex, changeArrayValue, moveArrayItem, removeArrayItem } from './stateArray';

const sample = [{n: 1}, {n: 2}, {n: 3}];


describe('Change array for useState', () => {
  test('Add before index', () => {
    expect(addByIndex(sample, {n: 4}, 0)).toEqual([{n: 4}, {n: 1}, {n: 2}, {n: 3}]);
    expect(addByIndex(sample, {n: 4}, 1)).toEqual([{n: 1}, {n: 4}, {n: 2}, {n: 3}]);
    expect(addByIndex(sample, {n: 4}, 3)).toEqual([{n: 1}, {n: 2}, {n: 3}, {n: 4}]);
  });

  test('Change object value', () => {
    expect(changeArrayValue(sample, 'n', 8, 1)).toEqual([{n: 1}, {n: 8}, {n: 3}]);
    expect(changeArrayValue(sample, 'n', 8, 0)).toEqual([{n: 8}, {n: 2}, {n: 3}]);
  });

  test('Move elements', () => {
    expect(moveArrayItem(sample, 1, 0)).toEqual([{n: 2}, {n: 1}, {n: 3}]);
    expect(moveArrayItem(sample, 1, 2)).toEqual([{n: 1}, {n: 3}, {n: 2}]);
  });

  test('Remove elements', () => {
    expect(removeArrayItem(sample, 0)).toEqual([{n: 2}, {n: 3}]);
    expect(removeArrayItem(sample, 1)).toEqual([{n: 1}, {n: 3}]);
    expect(removeArrayItem(sample, 2)).toEqual([{n: 1}, {n: 2}]);
  });
});