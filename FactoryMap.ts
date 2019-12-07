export class FactoryMap<K, V> extends Map<K, V> {

    private factory?: (k: K) => V;

    public constructor(iterableOrDefaultValueFactory?: Iterable<[K, V]> | ((k: K) => V), defaultValueFactory?: (k: K) => V) {
        const isFunctionOrUndefined = (f?: Iterable<[K, V]> | ((k: K) => V)): f is (((k: K) => V) | undefined) => iterableOrDefaultValueFactory === undefined || typeof iterableOrDefaultValueFactory === 'function';
        if (isFunctionOrUndefined(iterableOrDefaultValueFactory)) {
            if (iterableOrDefaultValueFactory && defaultValueFactory) {
                throw new Error('Unexpected constructor params');
            }
            super();
            this.factory = iterableOrDefaultValueFactory;
        } else {
            super(iterableOrDefaultValueFactory);
            this.factory = defaultValueFactory;
        }
    }

    public get(key: K, defaultValueFactory?: (k: K) => V) {
        let r = super.get(key);
        if (r === undefined) {
            if (defaultValueFactory) {
                r = defaultValueFactory(key);
            } else if (this.factory) {
                r = this.factory(key);
            }
            if (r !== undefined) {
                super.set(key, r);
            }
        }
        return r;
    }
}
