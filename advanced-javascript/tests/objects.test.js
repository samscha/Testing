const assert = require('chai').expect;
const objectFunctions = require('../src/objects');

// whoops.. there is no test suite for this file. You'll simply just have to create one :/
describe('Objects', () => {
  describe('`keys`', () => {
    const keys = objectFunctions.keys;

    it('should be a function', () => {
      assert(keys).to.be.a('function');
    });

    it('should return an array', () => {
      const obj = { hello: 'world' };

      assert(keys(obj)).to.be.an('array');
    });

    it("should return an array of strings that correspond with the object's properties", () => {
      const obj = {
        hello: 'world',
        world: 'hello',
      };

      assert(keys(obj)).to.have.ordered.members(['hello', 'world']);
    });
  });

  describe('`values`', () => {
    const values = objectFunctions.values;

    it('should be a function', () => {
      assert(values).to.be.a('function');
    });

    it('should return an array', () => {
      const obj = { hello: 'world' };

      assert(values(obj)).to.be.an('array');
    });

    it("should return an array of strings that correspond with the object's values", () => {
      const obj = {
        hello: 'world',
        world: 'hello',
      };

      assert(values(obj)).to.have.ordered.members(['world', 'hello']);
    });
  });

  describe('`mapObject`', () => {
    const mapObject = objectFunctions.mapObject;

    it('should be a function', () => {
      assert(mapObject).to.be.a('function');
    });

    it('should return an object', () => {
      const obj = { hello: 'world' };

      const res = mapObject(obj, _ => _);

      assert(res).to.not.be.an('array');
      assert(res).to.be.an('object');
    });

    it('should return an object with all of its values properly mapped', () => {
      const obj = {
        hello: 1,
        world: 2,
      };

      assert(mapObject(obj, e => e * 100)).to.deep.equal({
        hello: 100,
        world: 200,
      });

      obj.hello = 'hello';
      obj.world = 'world';

      assert(mapObject(obj, e => e + '1')).to.deep.equal({
        hello: 'hello1',
        world: 'world1',
      });
    });
  });

  describe('`pairs`', () => {
    const pairs = objectFunctions.pairs;

    it('should be a function', () => {
      assert(pairs).to.be.a('function');
    });

    it('should return an array of arrays', () => {
      const obj = { hello: 'world' };

      const res = pairs(obj);

      assert(res).to.be.an('array');
      assert(res[0]).to.be.an('array');
    });

    it("should return key, value pairs that properly match the object's properties", () => {
      const obj = {
        hello: 'world',
        world: 'hello',
      };

      assert(pairs(obj)).to.deep.equal([
        ['hello', 'world'],
        ['world', 'hello'],
      ]);
    });

    describe('`invert`', () => {
      const invert = objectFunctions.invert;

      it('should be a function', () => {
        assert(invert).to.be.a('function');
      });

      it('should return an object', () => {
        const obj = { hello: 'world' };

        const res = invert(obj, _ => _);

        assert(res).to.not.be.an('array');
        assert(res).to.be.an('object');
      });

      it('should return an object where the keys and values have been switched', () => {
        const obj = {
          hello: 'world',
          ilove: 'javascript',
          one: 1,
        };

        assert(invert(obj)).to.deep.equal({
          world: 'hello',
          javascript: 'ilove',
          1: 'one',
        });
      });
    });

    describe('`defaults`', () => {
      const defaults = objectFunctions.defaults;

      it('should be a function', () => {
        assert(defaults).to.be.a('function');
      });

      it('should return an object', () => {
        const obj = { hello: 'world' };

        const res = defaults(obj, _ => _);

        assert(res).to.not.be.an('array');
        assert(res).to.be.an('object');
      });

      it('should return an object where defaults have been filled in', () => {
        const obj = {
          hello: 'world',
        };

        assert(
          defaults(obj, { ilove: 'javascript', lambda: '4life' }),
        ).to.deep.equal({
          hello: 'world',
          ilove: 'javascript',
          lambda: '4life',
        });
      });

      it('should not overwrite existing defined properties with defaults', () => {
        const obj = {
          hello: 'world',
        };

        assert(defaults(obj, { lala: 1, hello: 'www' })).to.deep.equal({
          hello: 'world',
          lala: 1,
        });
      });
    });
  });
});
