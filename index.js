'use strict';

const config = require('config');
const GroupCollection = require('./src/GroupCollection');

debugger;

let url = "https://api.prod.headspace.com/content/group-collections";

// request(url, bearerToken)
//   .then(data => {
//     let parsed = JSON.parse(data);
//     console.log('success');
//     // console.log(parsed);
//   })
//   .catch( err => {
//     console.log("error")
//     // console.warn(err);
//     // process.exit(0);
//   })

/*
- instantiate each Class
- pass Classname.process() in promise-chain
  - return list of URLs for next class to process
  - each class has its own Model
- Download phase, collects signed-URLs, once downloaded in memory, use models to
  provide ID3 tags, then save to a destination folder.
*/

let groupCollector = new GroupCollection(config.get('app.groupCollection'));

Promise.resolve(url)
// .then(data => {return groupCollector.processAll(data)})
.then(groupCollector.processAll.bind(groupCollector))
// .then() // save to DB
// .then() // Query all activityGroups to feed into activityGroupCollector
// .then(processActivityGroups())
// .then(processActivities())
// .then(processVariations())
// .then(processMedia())
// .then(downloadMedia())
// .then(createTaggedMedia())
.then(data => {
  console.log('FINISHED!');
  console.log(data);
})
.catch(e => {
  console.error(e);
});
