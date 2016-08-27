'use strict';

var FactoryMap = require('../factorymap');
var chai = require('chai');
var expect = chai.expect;


describe('Default Map', () => {

    describe('constructor()', () => {
        it('should exist', () => {
            expect(() => new FactoryMap()).not.to.throw(Error);
        });
    });

    describe('get()', () => {
        it('should get previously set value', () => {
            let map = new FactoryMap();

            map.set('foo', 1);
            map.set('bar', 2);

            expect(map.get('foo')).to.equal(1);
            expect(map.get('bar')).to.equal(2);
        });

        it('should get value from constructor', () => {
            let map = new FactoryMap([['foo', 1], ['bar', 2]]);

            expect(map.get('foo')).to.equal(1);
            expect(map.get('bar')).to.equal(2);
        });

        it('should get undefined if no factory specified', () => {
            let map = new FactoryMap();

            /* jshint -W030 */  // Expected expression. Allows chai's assertions like 'exist' that appear to jshint to do nothing.
            expect(map.get('foo')).to.be.undefined;
            expect(map.get('bar')).to.be.undefined;
            /* jshint +W030 */
        });

        it('should get default using constructor factory if no set value', () => {
            let map = new FactoryMap(x => x === 'foo');

            expect(map.get('foo')).to.equal(true);
            expect(map.get('bar')).to.equal(false);
        });

        it('should get default using method factory if no set value', () => {
            let map = new FactoryMap();

            expect(map.get('foo', x => x === 'foo')).to.equal(true);
            expect(map.get('bar', x => x === 'foo')).to.equal(false);
        });

        it('should get default using method factory if no set value, even if constructor factory is specified', () => {
            let map = new FactoryMap(x => x === 'foo');

            expect(map.get('foo', x => x !== 'foo')).to.equal(false);
            expect(map.get('bar', x => x !== 'foo')).to.equal(true);
        });

        it('should get previously set value even if method factory is specified', () => {
            let map = new FactoryMap();

            map.set('foo', 1);

            expect(map.get('foo', x => x === 'foo')).to.equal(1);
        });

        it('should get previously set value even if constructor factory is specified', () => {
            let map = new FactoryMap(x => x === 'foo');

            map.set('foo', 1);

            expect(map.get('foo')).to.equal(1);
        });

        it('should get default value when both iterable and factory passed to constructor', () => {
            let map = new FactoryMap([['bar', 2]], x => x === 'foo');

            expect(map.get('foo')).to.equal(true);
            expect(map.get('bar')).to.equal(2);
        });

        it('should get previously set value when both iterable and factory passed to constructor', () => {
            let map = new FactoryMap(x => x === 'foo');

            map.set('foo', 1);

            expect(map.get('foo')).to.equal(1);
        });

        it('should not set key on map when getting an undefined value with method factory', () => {
            let map = new FactoryMap();

            map.get('foo', () => undefined);

            expect(Array.from(map.keys())).not.to.include('foo');
        });

    });
});
