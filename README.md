# Factory Map #

Extension of ECMAScript 6 Map to provide default values where no key
exists.

Replace code like:

```javascript
    let map = Map();
    // ...
    let foo = map.get('foo');
    if (foo === undefined) {
      map.set('foo', 1);
    }
```

with

```javascript
    let map = FactoryMap();
    // ...
    let foo = map.get('foo', () => 1);
```

## Usage ##

Use just like a normal
[ECMAScript 6 Map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map)
with the following two additions:

  1. Provide an optional factory function to _get()_.  If the key does
  not exist in the map, then the factory function is called to create a
  value.  This value is inserted into the map at the given key and
  returned.

  ```javascript
      let map = new FactoryMap();               // create empty map
      let value = map.get('foo', key => 'bar')  // query for a key that does not exist
      console.log(value);                       // print 'bar'
  ```
  1. Provide an optional factory function to as the last parameter to
  FactoryMap constructor.  This factory function applies to all calls to
  _get()_.  A factory function can still be passed to _get()_ to
  override.

  ```javascript
      let map1 = new FactoryMap(key => 'bar');
      let value1 = map1.get('foo')
      console.log(value1);                       // 'bar'

      let map2 = new FactoryMap([['baz', 'x']], key => 'bar');
      let value2 = map2.get('foo')
      console.log(value2);                       // 'bar'

      let map3 = new FactoryMap(key => 'bar');
      let value3 = map3.get('foo', key => 'bat')
      console.log(value3);                       // 'bat'
  ```

## License ##

Distributed under [MIT](LICENSE) license

## Contributing ##

Feedback and contributions are welcome.  All code changes should be
accompanied by suitable tests to be run with:

```npm test```
