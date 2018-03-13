/* eslint-disable */

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const arrayFunctions = require('../src/arrays');

const expect = chai.expect;
chai.use(sinonChai);

// we've gone ahead and gotten a start here for you,
// except, for some reason, none of our current assertions are working.
// first step is to make sure all these assertions work.
// then make sure you have at least 2-3 more assertions for every function.
// hint 1. - you need to pass data to the functions and get expected output.
// hint 2. - you should test the data type being called back, and perform some sort of operation on the data.
// hint 3. - if the function you're testing requires a * callback *, make sure you use a spy like sinon

describe('Arrays', () => {
  describe('`each`', () => {
    const each = arrayFunctions.each;

    it('should be a function', () => {
      expect(each).to.be.a('function');
    });

    it('should invoke cb on each array element', () => {
      const cb = sinon.spy();
      const arr = [1, 2, 3];

      each(arr, cb);

      expect(cb).have.callCount(arr.length);
    });

    it('should pass the element and the index to cb', () => {
      const cb = sinon.spy();
      const arr = [4, 5, 6];

      each(arr, cb);

      let i = 0;
      expect(cb.getCall(i)).have.been.calledWithExactly(arr[i], i);
      i = 1;
      expect(cb.getCall(i)).have.been.calledWithExactly(arr[i], i);
      i = 2;
      expect(cb.getCall(i)).have.been.calledWithExactly(arr[i], i);
    });
  });

  describe('`map`', () => {
    const map = arrayFunctions.map;

    it('should be a function', () => {
      expect(map).to.be.an('function');
    });

    it('should return an array', () => {
      const arr = [];

      expect(map(arr, _ => _)).to.be.an('array');
    });

    it('should pass each item into the transform function', () => {
      const arr = [1, 2, 3];

      expect(map(arr, e => e * 10)).to.have.ordered.members([10, 20, 30]);
    });

    it('should call the callback passed to it for each element in array given', () => {
      const cb = sinon.spy();
      const arr = [4, 5, 6];

      map(arr, cb);

      expect(cb).have.callCount(arr.length);
    });
  });

  describe('`reduce`', () => {
    const reduce = arrayFunctions.reduce;

    it('should be a function', () => {
      expect(reduce).to.be.a('function');
    });

    it("should reduce the array's contents to a single value", () => {
      expect(reduce([], _ => _, 0)).to.be.a('number');
    });

    it('should return the correct answer', () => {
      const arr = [1, 2, 3, 4];

      expect(reduce(arr, (s, e) => s + e)).equal(10);
    });

    it('should return the correct answer with initial value', () => {
      const arr = [1, 2, 3, 4];

      expect(reduce(arr, (s, e) => s + e, 2)).equal(12);
    });
  });

  describe('`find`', () => {
    const find = arrayFunctions.find;

    it('should be a function', () => {
      expect(find).to.be.an('function');
    });

    it('should return the first element that passes the truth test', () => {
      const arr = [1, 2, 3];

      expect(find(arr, n => n === 3)).equal(3);
    });

    it('should return undefined if not found', () => {
      const arr = [4, 5, 6];

      expect(find(arr, n => n === 7)).equal(undefined);
    });
  });

  describe('`filter`', () => {
    const filter = arrayFunctions.filter;

    it('should be a function', () => {
      expect(filter).to.be.a('function');
    });

    it('should return an array', () => {
      const arr = [1, 2, 3];

      expect(filter([], _ => _)).to.be.a('array');
    });

    it('should return an empty array if no elements pass truth test', () => {
      const arr = [4, 5, 6];
      const res = filter(arr, num => num === 10);

      expect(res).to.be.an('array');
      expect(res.length).equal(0);
    });

    it('should return an array with all elements that pass truth test', () => {
      const arr = [7, 8, 9];
      const res = filter(arr, n => n > 7);

      expect(res).to.be.an('array');
      expect(res.length).equal(2);
    });
  });

  describe('`flatten`', () => {
    const flatten = arrayFunctions.flatten;

    it('should be a function', () => {
      expect(flatten).to.be.a('function');
    });

    it('should return an array', () => {
      const arr = [1, 2, 3];

      expect(flatten([], _ => _)).to.be.a('array');
    });

    it('should return a flattened array when given a nested array', () => {
      const arr = [1, 2, 3, 4, 5, [6], [7]];
      const res = flatten(arr);

      expect(res).to.be.an('array');
      expect(res).to.have.ordered.members([1, 2, 3, 4, 5, 6, 7]);
    });

    it('should return a flattened array regardless of how deep the array nesting is', () => {
      const arr = [1, [2], [[3]], [[[4]]]];

      const res = flatten(arr);
      expect(res).to.have.ordered.members([1, 2, 3, 4]);
    });
  });
});
