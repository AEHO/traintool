TrainTool.ApplicationSerializer = DS.RESTSerializer.extend({
  // When extract the JSON get the data from data[root].
  // In the case data['items']
  extract: function(store, primaryType, payload, recordId, requestType) {
    var root = "items";
    payload = this.normalizePayload(primaryType, payload);
    if(Object.keys(payload).length === 0){
      return [];
    }    
    var primaryRecord = this.normalize(primaryType, payload[root], root);
    return primaryRecord;
  }
});

TrainTool.ApplicationAdapter = DS.RESTAdapter.extend({
  //host:'http://localhost:8080',
  host:'https://gup-traintool.appspot.com',
  namespace:'_ah/api/gupapi/v1',

  // Generate an URL for each operation type.
  // In the case that the operation is POST the
  // type in the URL will be in singular form.
  buildURLByOperation: function(type, operation) {
    var url = [],
        host = this.get('host'),
        prefix = this.urlPrefix();

    if (type) {
      if(operation === "POST"){
        url.push(this.pathForTypeSingular(type));
      } else {
        url.push(this.pathForType(type));
      }
    }
    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url) { url = '/' + url; }

    return url;
  },


  // Return the path in singular.
  pathForTypeSingular: function(type) {
    var camelized = Ember.String.camelize(type);
    return camelized;
  },

  // Create record using the URL based on the operation
  // type.
  createRecord: function(store, type, record) {
    var requestType = "POST";
    var data = {};
    var serializer = store.serializerFor(type.typeKey);

    serializer.serializeIntoHash(data, type, record, { includeId: true });
    return this.ajax(this.buildURLByOperation(type.typeKey, requestType),requestType, { data: data });
  }
});
