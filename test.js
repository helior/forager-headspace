const mock = require('./mocks/groupCollections.json');
const GroupCollection = require('./src/GroupCollection');

let processor = new GroupCollection({});
// let output = processor.map(mock);

Promise.resolve(mock)
.then(processor.map.bind(processor))
.then(processor.persist.bind(processor))
.catch(e => {
  console.error(e);
});
// console.log(output);
console.log("END of script.");
