module.exports = (function() {
    'use strict';

    class FactoryMap extends Map {

        constructor(...args) {
            if (typeof args[args.length-1] === 'function') {
                super(...args.slice(0, args.length-1));
                this._factory = args[args.length-1];
            } else {
                super(...args);
            }
        }

        get(key, defaultValueFactory) {
            var r = super.get(key);
            if (r === undefined) {
                if (defaultValueFactory) {
                    r = defaultValueFactory(key);
                } else if (this._factory) {
                    r = this._factory(key);
                }
                if (r !== undefined) {
                    super.set(key, r);
                }
            }
            return r;
        }
    }

    return FactoryMap;
}());
