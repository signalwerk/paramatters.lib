// handle immutable and obj
const get = (obj, key) => obj[key] || obj.get(key);

export default get;
