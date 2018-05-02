const _ = require('lodash');
const request = require('./lib/requestFactory');
const Processor = require('./lib/Processor');
const makeArray = require('./utils/makeArray');
const buildRelationshipStubs = require('./utils/buildRelationshipStubs');

class GroupCollection extends Processor {
  constructor(config) {
    super(config);
    this.output = ['abc','def','ghi'];
  }

  // Handle processing all URLs passed in
  processAll(input) {
    // should be an array of url strings
    input = makeArray(input);

    // An array of promises
    let items = _.map(input, this.process.bind(this));

    // After all URLs have been processed, handle collecting the next set of
    // URLs to process.
    return Promise.all(items)
      .then(this.getOutput.bind(this))
      .catch(e => {
        console.log('processAll failed.');
        console.error(e);
      });
  }

  // Process a single URL
  process(item) {
    return Promise.resolve(item)
      .then(this.fetch.bind(this))
      .then(this.map.bind(this))
      .then(this.persist.bind(this))
      .catch( e => {
        console.log('process failed').
        console.error(e);
      })
  }

  fetch(url) {
    return request(url)
      .then(data => {
        // todo try..catch
        return JSON.parse(data);
      })
      .catch(e => {
        console.log('There was an error requesting ', url);
      });
  }

  map(data) {
    // console.log("input data for map: ",data);
    // JSON-API includes are structured as arrays, but here I group the elements
    // by "type" into their respective object named-properties.
    data.included = _.groupBy(data.included, 'type');


    // Convenience. Key elements by id in replaced "type" objects
    _.forEach(data.included, (includeElements, type) => {
      data.included[type] = _.keyBy(includeElements, e => e.id);
    });

    // Convenience. Assuming response items are unique.
    // * But decided against it. * 
    // data.data = _.keyBy(data.data, o => o.id);

    // Build an array of Group Collection items.
    let groupCollections = _.map(data.data, (item, key) => {
      return {
        id: item.id,
        name: item.attributes.name,
        description: item.attributes.description,
        category: item.attributes.category,
        ordinalNumber: item.attributes.ordinalNumber,
        activityGroups: buildRelationshipStubs(item, 'orderedGroups', 'activityGroup', data)
      }
    });

    return groupCollections;
  }

  persist(data) {
    console.log("input data for persist: ",data);
    return ['returned persiste data'];
  }

  getOutput() {
    return this.output;
  }

}


module.exports = GroupCollection;
