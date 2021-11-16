class Container {
  Map: string[] = [];
  Set: string[] = [];
  Function: string[] = [];
  Promise: string[] = [];
  BigInt: string[] = [];
  Symbol: string[] = [];
}

export default function jsonFieldCheck(obj: any): Container {
  const container = new Container();
  const pointers: unknown[] = [];

  const deepCheck = function (obj: any, path = '') {
    const arrIter = Object.keys(obj)[Symbol.iterator]();
    let ele = arrIter.next();
    if (pointers.includes(obj)) return container;
    if (typeof obj === 'object') {
      pointers.push(obj);
    }

    while (!ele.done) {
      const { value: _key } = ele;
      const _path = (path ? path + '.' : path) + _key;
      const type = Object.prototype.toString.call(obj[_key]).replace(/\[|\]/g, '').split(/\s+/g)[1];
      switch (type) {
        case 'Map':
          !container.Map.includes(_path) && container.Map.push(_path);
          break;
        case 'Function':
          !container.Function.includes(_path) && container.Function.push(_path);
          break;
        case 'Promise':
          !container.Promise.includes(_path) && container.Promise.push(_path);
          break;
        case 'Set':
          !container.Set.includes(_path) && container.Set.push(_path);
          break;
        case 'BigInt':
          !container.BigInt.includes(_path) && container.BigInt.push(_path);
          break;
        case 'Symbol':
          !container.Symbol.includes(_path) && container.Symbol.push(_path);
          break;
        case 'Object':
          deepCheck(obj[_key], _path);
          break;
        case 'Array':
          for (const item of obj[_key]) {
            deepCheck(item, _path);
          }
      }
      ele = arrIter.next();
    }
    return container;
  };
  return deepCheck(obj, '');
}
