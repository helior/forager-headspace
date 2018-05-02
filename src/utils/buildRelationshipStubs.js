const _ = require('lodash');

module.exports = (hostObject, joinTableName, relationshipName, payload) => {
  return _.map(hostObject.relationships[joinTableName].data, relationshipObject => {
    let targetObject = payload.included[joinTableName][relationshipObject.id];

    return {
      id: targetObject.relationships[relationshipName].data.id,
      type: targetObject.relationships[relationshipName].data.type,
      // todo: remove hard-coded ordinalNumber. Add "extraAttributes" array paramater
      ordinalNumber: targetObject.attributes.ordinalNumber
    }
  });
}
