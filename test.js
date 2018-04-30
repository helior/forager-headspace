const mock = require('./mocks/groupCollections.json');
const GroupCollection = require('./src/GroupCollection');

debugger;

let processor = new GroupCollection({});
let output = processor.map(mock);
console.log(output);
