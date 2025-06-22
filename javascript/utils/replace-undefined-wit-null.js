{
  /**
   * undefined를 null로 바꾸는 재귀함수
   * @param {any} obj
   * @returns {any}
   */
  function replaceUndefinedWithNull(obj) {
    if (obj === undefined) {
      return null;
    }

    if (obj === null) {
      return null;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => replaceUndefinedWithNull(item));
    }

    if (typeof obj === 'object' && obj !== null) {
      const newObj = {};
      for (const [key, value] of Object.entries(obj)) {
        newObj[key] = replaceUndefinedWithNull(value);
      }
      return newObj;
    }

    // 기본값(primitive types)
    return obj;
  }
}
