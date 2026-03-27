function deepClone(obj, hash = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags);
    }

    if (hash.has(obj)) {
        return hash.get(obj);
    }

    if (obj instanceof Map) {
        const clonedMap = new Map();
        hash.set(obj, clonedMap);
        
        obj.forEach((value, key) => {
            clonedMap.set(deepClone(key, hash), deepClone(value, hash));
        });
        
        return clonedMap;
    }

    if (obj instanceof Set) {
        const clonedSet = new Set();
        hash.set(obj, clonedSet);
        
        obj.forEach(value => {
            clonedSet.add(deepClone(value, hash));
        });
        
        return clonedSet;
    }

    if (Array.isArray(obj)) {
        const clonedArray = [];
        hash.set(obj, clonedArray);
        
        obj.forEach((item, index) => {
            clonedArray[index] = deepClone(item, hash);
        });
        
        return clonedArray;
    }

    const clonedObj = Object.create(Object.getPrototypeOf(obj));
    hash.set(obj, clonedObj);

    const keys = [
        ...Object.getOwnPropertyNames(obj),
        ...Object.getOwnPropertySymbols(obj)
    ];

    keys.forEach(key => {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        
        if (descriptor.get || descriptor.set) {
            Object.defineProperty(clonedObj, key, descriptor);
        } else {
            clonedObj[key] = deepClone(obj[key], hash);
        }
    });

    return clonedObj;
}